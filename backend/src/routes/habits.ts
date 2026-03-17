import { FastifyInstance } from "fastify";
import { db } from "../db";
import { habits } from "../db/schema";
import { eq } from "drizzle-orm";

export async function habitRoutes(app: FastifyInstance) {
  // ... (POST e GET já feitos no Dia 2)

  // PATCH: Inverter status do hábito
  app.patch("/habits/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

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
  });

  // DELETE: Remover hábito
  app.delete("/habits/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    const result = await db.delete(habits).where(eq(habits.id, id)).returning();

    if (result.length === 0) {
      return reply.status(404).send({ message: "Hábito não existe." });
    }

    return reply.status(204).send(); // Sucesso sem conteúdo
  });
}
