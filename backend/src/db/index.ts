import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import "dotenv/config";

// Cria o pool de conexões
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Inicializa o Drizzle com o schema que você definiu
export const db = drizzle(pool, { schema });
