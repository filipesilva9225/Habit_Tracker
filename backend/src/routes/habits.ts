import { FastifyInstance } from "fastify";
import { db } from "../db";
import { habits } from "../db/schema";
import { eq } from "drizzle-orm";

export async function habitRoutes(app: FastifyInstance) {
  app.post("/habits", async (request, reply) => {
    const { name } = request.body as { name: string };

    if (!name) {
      return reply.status(400).send({ message: "O nome é obrigatório" });
    }

    const result = await db.insert(habits).values({ name }).returning();
    return reply.status(201).send(result[0]);
  });

  app.get("/habits", async () => {
    const allHabits = await db.select().from(habits);
    return allHabits;
  });

  app.patch("/habits/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    try {
      const habit = await db
        .select()
        .from(habits)
        .where(eq(habits.id, id))
        .limit(1);

      if (habit.length === 0) {
        return reply.status(404).send({ message: "Hábito não encontrado!" });
      }

      const updated = await db
        .update(habits)
        .set({ is_completed: !habit[0].is_completed })
        .where(eq(habits.id, id))
        .returning();

      return updated[0];
    } catch (err) {
      return reply.status(400).send({ message: "ID inválido. Use um UUID." });
    }
  });

  app.delete("/habits/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    try {
      const result = await db
        .delete(habits)
        .where(eq(habits.id, id))
        .returning();

      if (result.length === 0) {
        return reply.status(404).send({ message: "Hábito não existe." });
      }

      return reply.status(204).send();
    } catch (err) {
      return reply.status(400).send({ message: "ID inválido." });
    }
  });
}
