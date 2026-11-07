// Fills a development database with sample data. The sample data is fictional, so
// this must never run against production.
import { seedDatabase } from "../server/seed";
import { pool } from "../server/db";

// NODE_ENV alone isn't enough: a shell can hold the production DATABASE_URL without it.
if (process.env.NODE_ENV === "production" || process.env.ALLOW_SAMPLE_DATA !== "yes") {
  console.error("Refusing to seed. For a development database only, run: ALLOW_SAMPLE_DATA=yes npm run db:seed");
  process.exit(1);
}

await seedDatabase();
await pool.end();
