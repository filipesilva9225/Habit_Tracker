import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// 1. Cria o pool de conexões usando a URL do .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 2. Inicializa o Drizzle já com o schema embutido e pronto para uso
export const db = drizzle(pool, { schema });
