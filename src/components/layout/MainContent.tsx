import { KanbanContextComponent } from "../../context/KanbanContextComponent";
import { KanbanBoard } from "../kanban/KanbanBoard";

export interface IMainContentProps {}

export function MainContent(props: IMainContentProps) {
  return (
    <main className="flex-1 py-6 sm:py-10 overflow-x-scroll">
      <KanbanContextComponent>
        <KanbanBoard />
      </KanbanContextComponent>
    </main>
  );
}
