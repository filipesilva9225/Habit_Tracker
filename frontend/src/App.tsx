import { useState, useEffect } from "react";
import { Plus, Trash2, CheckCircle2, Circle, Loader2 } from "lucide-react";

interface Habit {
  id: string;
  name: string;
  is_completed: boolean;
}

export default function App() {
  const [newHabit, setNewHabit] = useState("");
  const [filter, setFilter] = useState<"pending" | "completed">("pending");
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3333/habits")
      .then((res) => res.json())
      .then((data) => {
        setHabits(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  // Cálculos para a Barra de Progresso
  const totalHabits = habits.length;
  const completedCount = habits.filter((h) => h.is_completed).length;
  const progress =
    totalHabits > 0 ? Math.round((completedCount / totalHabits) * 100) : 0;

  async function handleAddHabit(event: React.FormEvent) {
    event.preventDefault();
    if (!newHabit.trim()) return;

    const response = await fetch("http://localhost:3333/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newHabit }),
    });

    const savedHabit = await response.json();
    setHabits((state) => [...state, savedHabit]);
    setNewHabit("");
  }

  async function toggleHabitStatus(id: string) {
    const response = await fetch(`http://localhost:3333/habits/${id}`, {
      method: "PATCH",
    });
    const updatedHabit = await response.json();
    setHabits((state) => state.map((h) => (h.id === id ? updatedHabit : h)));
  }

  async function handleDeleteHabit(id: string) {
    await fetch(`http://localhost:3333/habits/${id}`, { method: "DELETE" });
    setHabits((state) => state.filter((h) => h.id !== id));
  }

  const filteredHabits = habits.filter((h) =>
    filter === "completed" ? h.is_completed : !h.is_completed,
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center p-6 font-sans">
      <div className="w-full max-w-md flex flex-col gap-8">
        <header className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-white">
              Habit Tracker
            </h1>
            <p className="text-zinc-400">Acompanhe sua evolução diária.</p>
          </div>

          {/* BARRA DE PROGRESSO - DIA 6 */}
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-zinc-300">
                Progresso de hoje
              </span>
              <span className="text-sm font-bold text-violet-500">
                {progress}%
              </span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-3">
              <div
                className="bg-violet-600 h-3 rounded-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(124,58,237,0.5)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex gap-4 border-b border-zinc-800">
            <button
              onClick={() => setFilter("pending")}
              className={`pb-2 text-sm font-semibold transition-all ${filter === "pending" ? "border-b-2 border-violet-600 text-violet-500" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              Pendentes ({habits.filter((h) => !h.is_completed).length})
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`pb-2 text-sm font-semibold transition-all ${filter === "completed" ? "border-b-2 border-violet-600 text-violet-500" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              Concluídos ({completedCount})
            </button>
          </div>
        </header>

        <form onSubmit={handleAddHabit} className="flex gap-2">
          <input
            type="text"
            placeholder="Qual o novo hábito?"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-600 transition-all placeholder:text-zinc-600"
          />
          <button
            type="submit"
            className="bg-violet-600 hover:bg-violet-700 p-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-violet-900/20"
          >
            <Plus size={24} />
          </button>
        </form>

        <main className="flex flex-col gap-3">
          {isLoading ? (
            <div className="flex flex-col items-center gap-2 mt-8">
              <Loader2 className="animate-spin text-violet-600" size={32} />
              <p className="text-zinc-500">Sincronizando com o banco...</p>
            </div>
          ) : (
            filteredHabits.map((habit) => (
              <div
                key={habit.id}
                className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center justify-between group hover:border-zinc-700 transition-all"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleHabitStatus(habit.id)}
                    className="text-violet-500 hover:scale-110 transition-transform"
                  >
                    {habit.is_completed ? (
                      <CheckCircle2 size={26} />
                    ) : (
                      <Circle size={26} className="text-zinc-700" />
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
                  className="text-zinc-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}

          {!isLoading && filteredHabits.length === 0 && (
            <p className="text-center text-zinc-600 mt-10 italic">
              Nenhum hábito por aqui...
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
