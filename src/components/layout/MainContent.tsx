import { KanbanContextComponent } from "../../context/KanbanContextComponent";
import { KanbanBoard } from "../kanban/KanbanBoard";

export interface IMainContentProps {}

export function MainContent(props: IMainContentProps) {
  return (
    <main className="flex-1 py-6 sm:py-10 overflow-x-scroll scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-track-slate-600 dark:scrollbar-thumb-slate-400 scrollbar-thin">
      <KanbanContextComponent>
        <KanbanBoard />
      </KanbanContextComponent>
    </main>
  );
}
