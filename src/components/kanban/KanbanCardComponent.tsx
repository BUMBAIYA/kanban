import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { memo, useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import KanbanContext from "../../context/kanbanContext";
import { GetBaseURL } from "../../utility/baseUrl";
import { classNames } from "../../utility/css";
import { KanbanCard } from "./KanbanTypes";

export interface IKanbanCardComponentProps {
  listIndex: number;
  cardIndex: number;
  card: KanbanCard;
}

export default function KanbanCardComponent(props: IKanbanCardComponentProps) {
  const { handleOpenModal } = useContext(KanbanContext);

  const calculateTaskCompleted = () => {
    let completedTask = 0;
    for (let i = 0; i < props.card.tasks.length; i++) {
      if (props.card.tasks[i].completed) {
        completedTask++;
      }
    }
    return completedTask;
  };

  return (
    <Draggable draggableId={props.card.id} index={props.cardIndex}>
      {(provided) => (
        <div
          className="mb-3 w-64 rounded-lg bg-white shadow-sm transition-shadow duration-200 ease-in-out hover:shadow-lg hover:ring-0 focus:border-indigo-600 focus:outline-none border border-slate-200 dark:border-slate-600 focus:ring focus:ring-indigo-600 dark:bg-slate-800 dark:text-white dark:hover:shadow-slate-800/60"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() =>
            handleOpenModal({
              type: "UPDATE_CARD",
              modalProps: {
                listIndex: props.listIndex,
                cardIndex: props.cardIndex,
                card: props.card,
              },
            })
          }
        >
          {props.card.imageUrl && (
            <div
              className={classNames(
                props.card.completed ? "opacity-50" : "opacity-100",
                "h-40 overflow-hidden rounded-t-md"
              )}
            >
              <img
                src={props.card.imageUrl}
                alt="task banner"
                className="bg-cover"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = `${GetBaseURL()}/static/kanbanDefaultBanner.jpg`;
                }}
              />
            </div>
          )}
          <div className="p-4">
            <div className="flex items-center justify-between gap-5">
              <span
                className={classNames(
                  props.card.completed
                    ? "text-slate-400 dark:text-slate-500"
                    : "dark:text-white",
                  "truncate text-base font-semibold"
                )}
              >
                {props.card.title}
              </span>
              {!props.card.completed && props.card.tasks.length > 0 && (
                <div>{`${calculateTaskCompleted()}/${
                  props.card.tasks.length
                }`}</div>
              )}
              {props.card.completed && (
                <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
              )}
            </div>
            {props.card.completed === false && (
              <>
                {props.card.desc && (
                  <div className="mt-2 mb-1">
                    <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                      {props.card.desc}
                    </p>
                  </div>
                )}
                <div className="flex gap-1 flex-wrap">
                  {props.card.tags.map((_tag, index) => (
                    <span
                      className={classNames(
                        props.card.tags.length > 0 ? "mt-1" : "",
                        `px-3 py-1 text-sm font-semibold rounded-md ${_tag.color}`
                      )}
                      key={index}
                    >
                      {_tag.title}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}
