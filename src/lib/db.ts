import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { cartasTarot } from "./schema";

const connectionString = process.env.DRIZZLE_DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
export const db = drizzle(sql);


// Example function to fetch cards
export async function fetchAllCards() {
  return db.select().from(cartasTarot).execute();
}
