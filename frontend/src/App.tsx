import { useState } from "react";
import { Plus, Trash2, CheckCircle2, Circle } from "lucide-react";

export default function App() {
  const [newHabit, setNewHabit] = useState("");
  const [filter, setFilter] = useState<"pending" | "completed">("pending");
  const [habits, setHabits] = useState<
    { id: string; name: string; is_completed: boolean }[]
  >([]);

  function handleAddHabit(event: React.FormEvent) {
    event.preventDefault();
    if (!newHabit.trim()) return;

    const habit = {
      id: crypto.randomUUID(), // Gera um ID único temporário
      name: newHabit,
      is_completed: false,
    };

    setHabits((state) => [...state, habit]);
    setNewHabit("");
  }

  function toggleHabitStatus(id: string) {
    setHabits((state) =>
      state.map((habit) =>
        habit.id === id
          ? { ...habit, is_completed: !habit.is_completed }
          : habit,
      ),
    );
  }

  // Função para remover um hábito da lista
  function handleDeleteHabit(id: string) {
    setHabits((state) => state.filter((habit) => habit.id !== id));
  }

  const filteredHabits = habits.filter((habit) =>
    filter === "completed" ? habit.is_completed : !habit.is_completed,
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center p-6 font-sans">
      <div className="w-full max-w-md flex flex-col gap-8">
        <header className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Meus Hábitos
          </h1>

          <div className="flex gap-4 border-b border-zinc-800">
            <button
              onClick={() => setFilter("pending")}
              className={`pb-2 text-sm font-medium transition-all ${filter === "pending" ? "border-b-2 border-violet-600 text-violet-500" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              Pendentes ({habits.filter((h) => !h.is_completed).length})
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`pb-2 text-sm font-medium transition-all ${filter === "completed" ? "border-b-2 border-violet-600 text-violet-500" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              Concluídos ({habits.filter((h) => h.is_completed).length})
            </button>
          </div>
        </header>

        <form onSubmit={handleAddHabit} className="flex gap-2">
          <input
            type="text"
            placeholder="Qual o seu objetivo?"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-violet-600 transition-all text-zinc-200"
          />
          <button
            type="submit"
            className="bg-violet-600 hover:bg-violet-700 p-3 rounded-lg transition-colors text-white shadow-lg shadow-violet-900/20"
          >
            <Plus size={24} />
          </button>
        </form>

        <main className="flex flex-col gap-3">
          {filteredHabits.map((habit) => (
            <div
              key={habit.id}
              className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center justify-between group transition-all hover:border-zinc-700"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleHabitStatus(habit.id)}
                  className="text-violet-500 hover:scale-110 transition-transform focus:outline-none"
                >
                  {habit.is_completed ? (
                    <CheckCircle2 size={26} />
                  ) : (
                    <Circle size={26} />
                  )}
                </button>

                <span
                  className={`text-lg transition-all ${habit.is_completed ? "line-through text-zinc-500 italic" : "text-zinc-200"}`}
                >
                  {habit.name}
                </span>
              </div>

              <button
                onClick={() => handleDeleteHabit(habit.id)}
                className="text-zinc-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 p-1"
                title="Excluir tarefa"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}

          {filteredHabits.length === 0 && (
            <div className="flex flex-col items-center gap-2 mt-10">
              <p className="text-zinc-600 italic">Nada para mostrar aqui...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
