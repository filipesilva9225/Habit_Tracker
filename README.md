# 🚀 Habit Tracker (Full Stack)

Um aplicativo web moderno e responsivo para gerenciamento de hábitos diários. Construído do zero com foco em performance e uma interface de usuário agradável, permitindo criar, listar, concluir e excluir hábitos, com uma barra de progresso calculada em tempo real.

![Habit Tracker Preview](./frontend/src/assets/hero.png)

## 🛠️ Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

### Frontend
* **React** + **Vite**: Para uma interface reativa e construção ultrarrápida.
* **TypeScript**: Tipagem estática para maior segurança no código.
* **Tailwind CSS**: Estilização utility-first para um design moderno e modo escuro nativo.
* **Lucide React**: Biblioteca de ícones elegantes.

### Backend
* **Node.js** + **Fastify**: Servidor web focado em altíssima performance.
* **TypeScript**: Padronização de linguagem em toda a stack.
* **Drizzle ORM**: ORM moderno, tipado e leve para comunicação com o banco.
* **PostgreSQL** (via Docker): Banco de dados relacional robusto para persistência.

## ✨ Funcionalidades

- [x] Criação de novos hábitos.
- [x] Listagem em tempo real separada por abas (Pendentes e Concluídos).
- [x] Marcação de conclusão com atualização visual (riscado/opaco).
- [x] Exclusão de hábitos da base de dados.
- [x] **Barra de Progresso Dinâmica**: Calcula automaticamente a porcentagem de hábitos concluídos no dia.
- [x] Estado de carregamento (Loading spinner) durante o fetch de dados.

## ⚙️ Como rodar o projeto localmente

### Pré-requisitos
* Node.js (v18+)
* Docker (para rodar o banco de dados)

### 1. Clonando o Repositório
```bash
git clone [https://github.com/filipesilva9225/habit_tracker.git](https://github.com/filipesilva9225/habit_tracker.git)
cd habit_tracker
