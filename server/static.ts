import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const publicPath = path.resolve(__dirname, "public");
  const distPath = fs.existsSync(publicPath) ? publicPath : __dirname;
  if (!fs.existsSync(path.resolve(distPath, "index.html"))) {
    throw new Error(
      `Could not find the build directory with index.html at: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
