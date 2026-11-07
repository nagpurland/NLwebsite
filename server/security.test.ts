// Needs a throwaway database with the schema pushed: TEST_DATABASE_URL=postgres://... npm test
// Without it the run fails, so the security checks can't be skipped by accident.
import { after, before, describe, it } from "node:test";
import assert from "node:assert/strict";
import crypto from "crypto";
import { createServer, type Server } from "http";
import type { AddressInfo } from "net";
import express from "express";
import { hashPassword, isPublicApi, publicEventSchema, publicLeadSchema, verifyPassword } from "./auth";

describe("password hashing", () => {
  it("accepts the right password and rejects a wrong one", () => {
    const stored = hashPassword("correct horse battery");
    assert.equal(verifyPassword("correct horse battery", stored), true);
    assert.equal(verifyPassword("wrong", stored), false);
  });

  it("rejects old SHA-256 hashes, including the old default admin", () => {
    const old = crypto.createHash("sha256").update("nagpur123nagpur_salt_2024").digest("hex");
    assert.equal(verifyPassword("nagpur123", old), false);
  });
});

describe("public API list", () => {
  it("stays exactly as small as intended", () => {
    assert.equal(isPublicApi("POST", "/auth/login"), true);
    assert.equal(isPublicApi("POST", "/public/leads"), true);
    assert.equal(isPublicApi("POST", "/public/events"), true);
    assert.equal(isPublicApi("GET", "/public/events"), false);
    assert.equal(isPublicApi("POST", "/events"), false);
    for (const [method, path] of [
      ["GET", "/leads"],
      ["POST", "/leads"],
      ["POST", "/auth/register"],
      ["POST", "/seed"],
      ["DELETE", "/public/leads"],
      ["GET", "/auth/login"],
    ]) {
      assert.equal(isPublicApi(method, path), false, `${method} ${path}`);
    }
  });
});

describe("public lead form rules", () => {
  const base = { kind: "contact", name: "A", phone: "+91 98230 12345", message: "Hi", consent: true };

  it("needs consent", () => {
    assert.equal(publicLeadSchema.safeParse({ ...base, consent: false }).success, false);
  });

  it("needs a name and phone, or an email for the newsletter", () => {
    assert.equal(publicLeadSchema.safeParse({ ...base, phone: undefined }).success, false);
    assert.equal(publicLeadSchema.safeParse({ kind: "newsletter", consent: true }).success, false);
    assert.equal(publicLeadSchema.safeParse({ kind: "newsletter", consent: true, email: "a@b.co" }).success, true);
  });

  it("drops fields a visitor must not control", () => {
    const parsed = publicLeadSchema.parse({ ...base, status: "closed", intentScore: 10, notes: "x" });
    assert.deepEqual(Object.keys(parsed).sort(), ["consent", "kind", "message", "name", "phone"]);
  });
});

describe("public event rules", () => {
  const base = { event: "form_send", page: "inquiry", language: "hi" };

  it("accepts only fixed names", () => {
    assert.equal(publicEventSchema.safeParse(base).success, true);
    assert.equal(publicEventSchema.safeParse({ ...base, event: "anything" }).success, false);
    assert.equal(publicEventSchema.safeParse({ ...base, page: "/secret?phone=98230" }).success, false);
  });

  it("refuses anything that could carry personal details", () => {
    for (const extra of [{ phone: "9823012345" }, { name: "A" }, { sessionId: "x" }, { message: "hi" }]) {
      assert.equal(publicEventSchema.safeParse({ ...base, ...extra }).success, false, Object.keys(extra)[0]);
    }
  });
});

const dbUrl = process.env.TEST_DATABASE_URL;

it("has a test database", () => {
  assert.ok(dbUrl, "TEST_DATABASE_URL is not set, so the API security tests did not run");
});

describe("API with a real database", { skip: !dbUrl }, () => {
  let server: Server;
  let base = "";
  let routes: Array<{ method: string; path: string }> = [];
  const password = "a-long-throwaway-test-password";
  const username = `test-${crypto.randomBytes(4).toString("hex")}`;

  const post = (path: string, body: unknown, token?: string) =>
    fetch(base + path, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify(body),
    });

  const login = async () => {
    const res = await post("/api/auth/login", { username, password });
    assert.equal(res.status, 200);
    return (await res.json()).token as string;
  };

  before(async () => {
    process.env.DATABASE_URL = dbUrl;
    const { registerRoutes } = await import("./routes");
    const { db } = await import("./db");
    const { users } = await import("@shared/schema");
    await db.insert(users).values({ username, password: hashPassword(password), role: "admin" });

    const app = express();
    app.use(express.json());
    server = createServer(app);
    await registerRoutes(server, app);
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;

    // Every route the app registers, so a new route can't dodge this test.
    routes = (app as any)._router.stack
      .filter((layer: any) => layer.route)
      .flatMap((layer: any) =>
        Object.keys(layer.route.methods).map((method) => ({ method: method.toUpperCase(), path: layer.route.path })),
      );
  });

  after(async () => {
    server?.close();
    const { pool } = await import("./db");
    await pool.end();
  });

  it("blocks every non-public API route when not logged in", async () => {
    assert.ok(routes.length > 50, `expected many routes, found ${routes.length}`);
    for (const route of routes) {
      const path = route.path.replace(/:\w+/g, "1");
      if (isPublicApi(route.method, path.replace(/^\/api/, ""))) continue;
      const res = await fetch(base + path, {
        method: route.method,
        headers: { "Content-Type": "application/json" },
        body: route.method === "GET" ? undefined : "{}",
      });
      assert.equal(res.status, 401, `${route.method} ${path} returned ${res.status}`);
    }
  });

  it("blocks other spellings of a protected path", async () => {
    for (const path of ["/API/leads", "/api/leads/", "/api/LEADS", "/api//leads", "/api/%6Ceads"]) {
      const res = await fetch(base + path);
      assert.notEqual(res.status, 200, path);
    }
  });

  it("rejects expired sessions and non-admin users", async () => {
    const { storage } = await import("./storage");
    const { db } = await import("./db");
    const { users } = await import("@shared/schema");
    const { generateToken, hashToken } = await import("./auth");
    const me = (token: string) => fetch(`${base}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } });

    const [admin] = await db.select().from(users).limit(1);
    const expired = generateToken();
    await storage.createSession(admin.id, hashToken(expired), new Date(Date.now() - 1000));
    assert.equal((await me(expired)).status, 401);

    const [plain] = await db
      .insert(users)
      .values({ username: `${username}-user`, password: hashPassword(password), role: "user" })
      .returning();
    const token = generateToken();
    await storage.createSession(plain.id, hashToken(token), new Date(Date.now() + 60000));
    assert.equal((await me(token)).status, 403);
  });

  it("has no register or seed route", () => {
    const paths = routes.map((route) => route.path);
    for (const removed of ["/api/auth/register", "/api/seed", "/api/admin/seed"]) {
      assert.equal(paths.includes(removed), false, removed);
    }
  });

  it("does not store the raw session token", async () => {
    const token = await login();
    const { storage } = await import("./storage");
    assert.equal(await storage.getSession(token), undefined);
    const me = await fetch(`${base}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
    assert.equal(me.status, 200);
  });

  it("logout ends the session", async () => {
    const token = await login();
    assert.equal((await post("/api/auth/logout", {}, token)).status, 200);
    const me = await fetch(`${base}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
    assert.equal(me.status, 401);
  });

  it("saves a public request, but ignores protected fields", async () => {
    const phone = `+91 98${crypto.randomInt(10000000, 99999999)}`;
    const res = await post("/api/public/leads", {
      kind: "plot_question",
      name: "Test Buyer",
      phone,
      message: "Is this layout sanctioned?",
      consent: true,
      status: "closed",
      intentScore: 10,
    });
    assert.equal(res.status, 201);

    const token = await login();
    const leads = await (await fetch(`${base}/api/leads`, { headers: { Authorization: `Bearer ${token}` } })).json();
    const saved = leads.find((lead: any) => lead.phone === phone);
    assert.ok(saved, "lead was not saved");
    assert.equal(saved.status, "new");
    assert.equal(saved.intentScore, 0);
    assert.match(saved.notes, /Agreed to privacy policy/);
  });

  it("counts an anonymous event, and only an admin can read the counts", async () => {
    const send = (body: unknown) => post("/api/public/events", body);
    assert.equal((await send({ event: "form_start", page: "inquiry", language: "en" })).status, 204);
    assert.equal((await send({ event: "form_start", page: "inquiry", language: "en", phone: "9823012345" })).status, 400);
    assert.equal((await fetch(`${base}/api/events/stats`)).status, 401);
    const token = await login();
    const stats = await (await fetch(`${base}/api/events/stats`, { headers: { Authorization: `Bearer ${token}` } })).json();
    assert.ok(stats.eventCounts.form_start >= 1);
  });

  it("saves a plot question without a message", async () => {
    const phone = `+91 96${crypto.randomInt(10000000, 99999999)}`;
    const res = await post("/api/public/leads", { kind: "plot_question", name: "Short Form", phone, locality: "Besa", consent: true });
    assert.equal(res.status, 201);
  });

  it("drops bot submissions without saving them", async () => {
    const phone = `+91 97${crypto.randomInt(10000000, 99999999)}`;
    const res = await post("/api/public/leads", { kind: "contact", name: "Bot", phone, message: "x", consent: true, website: "spam" });
    assert.equal(res.status, 201);
    const token = await login();
    const leads = await (await fetch(`${base}/api/leads`, { headers: { Authorization: `Bearer ${token}` } })).json();
    assert.equal(leads.some((lead: any) => lead.phone === phone), false);
  });

  it("limits repeated login attempts", async () => {
    let status = 0;
    for (let i = 0; i < 12 && status !== 429; i++) {
      status = (await post("/api/auth/login", { username, password: "wrong" })).status;
    }
    assert.equal(status, 429);
  });
});
