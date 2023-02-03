import { KanbanBoard } from "./components/kanban/KanbanBoard";
import Navbar from "./components/Navbar/Navbar";
import { KanbanContextComponent } from "./context/KanbanContextComponent";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col px-4 mt-12 py-8 sm:px-6">
        <KanbanContextComponent>
          <KanbanBoard />
        </KanbanContextComponent>
      </main>
    </>
  );
}
