// Creates an admin, or resets its password and signs it out everywhere.
// Usage: ADMIN_PASSWORD='...' npm run admin:set-password -- <username>
import { eq } from "drizzle-orm";
import { db, pool } from "../server/db";
import { sessions, users } from "../shared/schema";
import { hashPassword } from "../server/auth";

const username = process.argv[2];
const password = process.env.ADMIN_PASSWORD;

if (!username || !password || password.length < 12) {
  console.error("Usage: ADMIN_PASSWORD='at least 12 characters' npm run admin:set-password -- <username>");
  process.exit(1);
}

const [existing] = await db.select().from(users).where(eq(users.username, username));
if (existing) {
  await db.update(users).set({ password: hashPassword(password) }).where(eq(users.id, existing.id));
  await db.delete(sessions).where(eq(sessions.userId, existing.id));
  console.log(`Password reset for ${username}. Existing sessions were signed out.`);
} else {
  await db.insert(users).values({ username, password: hashPassword(password), role: "admin" });
  console.log(`Created admin ${username}.`);
}
await pool.end();
