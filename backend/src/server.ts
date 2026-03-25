import fastify from "fastify";
import cors from "@fastify/cors";
import { habitRoutes } from "./routes/habits";
import * as dotenv from "dotenv";

dotenv.config();

const app = fastify({
  logger: true,
});

app.register(cors, {
  origin: "*", // Ou a URL específica do seu front
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // <-- O segredo está aqui!
});

app.register(habitRoutes);

app.get("/", async () => {
  return {
    status: "online",
    message: "Habit Tracker API v1.0",
    docs: "/habits",
  };
});

const port = Number(process.env.PORT) || 3333;

app
  .listen({
    port: port,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log(`
  🚀 Servidor Full Stack Online!
  📡 Porta: ${port}
  🔗 Local: http://localhost:${port}
  `);
  });
