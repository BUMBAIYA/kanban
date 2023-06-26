import { KanbanContextComponent } from "../../context/KanbanContextComponent";
import { KanbanBoard } from "../kanban/KanbanBoard";

export interface IMainContentProps {}

export function MainContent(props: IMainContentProps) {
  return (
    <main className="flex-1 overflow-x-scroll py-6 scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 scrollbar-track-rounded-full scrollbar-thumb-rounded-full dark:scrollbar-track-slate-600 dark:scrollbar-thumb-slate-400 sm:py-10">
      <KanbanContextComponent>
        <KanbanBoard />
      </KanbanContextComponent>
    </main>
  );
}
