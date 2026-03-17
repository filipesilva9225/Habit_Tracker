import fastify from "fastify";
import { habitRoutes } from "./routes/habits";

const app = fastify();

// Registra as rotas que criamos no Dia 3
app.register(habitRoutes);

app.listen({ port: 3333 }).then(() => {
  console.log("🔥 Server running on http://localhost:3333");
});
