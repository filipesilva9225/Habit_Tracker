import { Plus, Trash2 } from "lucide-react"; // Ícones para o botão e lixeira

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center p-6">
      <div className="w-full max-w-md flex flex-col gap-8">
        {/* Cabeçalho */}
        <header className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight">Meus Hábitos</h1>
          <p className="text-zinc-400">Gerencie sua rotina diária.</p>
        </header>

        {/* Formulário de Adição (Dia 4: Apenas Visual) */}
        <form className="flex gap-2">
          <input
            type="text"
            placeholder="Ex: Beber água, Correr..."
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-violet-600 transition-all"
          />
          <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors">
            <Plus size={20} />
            Adicionar
          </button>
        </form>

        {/* Lista de Hábitos (Dia 4: Mock/Exemplo visual) */}
        <main className="flex flex-col gap-3">
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <input type="checkbox" className="w-5 h-5 accent-violet-600" />
              <span className="text-zinc-200">Exemplo de hábito</span>
            </div>
            <button className="text-zinc-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
              <Trash2 size={18} />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
