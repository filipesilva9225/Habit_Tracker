import fastify from "fastify";
import { habitRoutes } from "./routes/habits";

const app = fastify();

app.register(habitRoutes);

// Adicionado host '0.0.0.0' para evitar problemas de acesso no Codespaces
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("🔥 Server running on http://localhost:3333");
});
