import { KanbanContextComponent } from "../../context/KanbanContextComponent";
import { KanbanBoard } from "../kanban/KanbanBoard";

export interface IMainContentProps {}

export function MainContent(props: IMainContentProps) {
  return (
    <main className="scroll-thin flex-1 overflow-x-scroll py-6 sm:py-10">
      <KanbanContextComponent>
        <KanbanBoard />
      </KanbanContextComponent>
    </main>
  );
}
