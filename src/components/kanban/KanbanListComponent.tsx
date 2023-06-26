import { useContext } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { KanbanList } from "./KanbanTypes";
import { AddForm } from "./AddForm";
import KanbanContext from "../../context/kanbanContext";
import { classNames } from "../../utility/css";
import { ListMenu } from "./ListMenu";
import KanbanCardComponent from "./KanbanCardComponent";

export interface IKanbanListComponentProps {
  listIndex: number;
  list: KanbanList;
}

function KanbanListComponent(props: IKanbanListComponentProps) {
  const { handleCreateCard } = useContext(KanbanContext);
  return (
    <Draggable draggableId={props.list.id} index={props.listIndex}>
      {(provided) => (
        <div
          className={classNames(
            props.listIndex > 0 ? "ml-4" : "",
            "rounded-lg border border-slate-300 bg-slate-100 dark:border-slate-900 dark:bg-slate-600",
          )}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="flex cursor-grab touch-manipulation flex-col">
            <div
              {...provided.dragHandleProps}
              className="flex flex-row items-center justify-between rounded-t-lg p-4 focus:border-none focus:border-indigo-600 focus:outline-none focus:ring focus:ring-indigo-600 dark:text-white"
            >
              <div className="font-semibold">{props.list.title}</div>
              <ListMenu listIndex={props.listIndex} title={props.list.title} />
            </div>
            <Droppable droppableId={props.list.id}>
              {(provided) => (
                <div
                  className="flex min-h-[50px] flex-col"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <div className="p-3">
                    {props.list.cards.map((_card, index) => (
                      <KanbanCardComponent
                        key={_card.id}
                        listIndex={props.listIndex}
                        cardIndex={index}
                        card={_card}
                      />
                    ))}
                    {provided.placeholder}
                    <AddForm
                      text="Add card"
                      placeholder="New card name..."
                      onSubmit={(title) =>
                        handleCreateCard(props.listIndex, title)
                      }
                    />
                  </div>
                </div>
              )}
            </Droppable>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default KanbanListComponent;
