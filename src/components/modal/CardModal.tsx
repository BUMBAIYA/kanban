import { Fragment, useContext, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  CheckIcon,
  DocumentCheckIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import KanbanContext from "../../context/kanbanContext";
import useAutosizeTextArea from "../../hooks/useAutosizeTextarea";
import { KanbanCard } from "../kanban/KanbanTypes";
import Datepicker from "react-tailwindcss-datepicker";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";
import { CreateTagModal, tagColors } from "./CreateTagModal";
import { AddForm } from "../kanban/AddForm";
import { classNames } from "../../utility/css";

export interface CardModalProps {
  listIndex: number;
  cardIndex: number;
  card: KanbanCard;
}

export function CardModal(props: CardModalProps) {
  const imageTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const descTextAreaRef = useRef<HTMLTextAreaElement>(null);

  const [title, setTitle] = useState<string>(props.card.title);
  const [desc, setDesc] = useState(props.card.desc);
  const [date, setDate] = useState<DateValueType>(props.card.date);
  const [completed, setCompleted] = useState(props.card.completed);
  const [imageUrl, setImageUrl] = useState(props.card.imageUrl);
  const [tags, setTags] = useState(props.card.tags);
  const [tasks, setTasks] = useState(props.card.tasks);
  const [openTagModal, setOpenTagModal] = useState<boolean>(false);

  const { handleDeleteCard, handleUpdateCard, handleCloseModal, modalState } =
    useContext(KanbanContext);

  useAutosizeTextArea(imageTextAreaRef, imageUrl);
  useAutosizeTextArea(descTextAreaRef, desc);

  const handleSave = () => {
    if (title === "") {
      return;
    }
    handleUpdateCard(props.listIndex, props.cardIndex, {
      ...props.card,
      title,
      desc,
      completed,
      imageUrl,
      tags,
      tasks,
      date,
    });
    handleCloseModal();
  };

  const deleteCard = () => {
    handleDeleteCard(props.listIndex, props.cardIndex);
    handleCloseModal();
  };

  const handleDeleteTask = (taskIndex: number) => {
    const tempTask = [...tasks];
    tempTask.splice(taskIndex, 1);
    setTasks(tempTask);
  };

  const handleCreateTask = (taskTitle: string) => {
    const tempTask = [...tasks];
    tempTask.push({ title: taskTitle, completed: false });
    setTasks(tempTask);
  };

  const handleCreateTag = (tagName: string, colorIndex: number) => {
    const newTags = [...tags];
    newTags.push({ color: tagColors[colorIndex], title: tagName });
    setTags(newTags);
  };

  const handleDeleteTag = (tagIndex: number) => {
    const newTags = [...tags];
    newTags.splice(tagIndex, 1);
    setTags(newTags);
  };

  const handleToggleTaskCompleted = (index: number) => {
    const tempTask = [...tasks];
    tempTask[index].completed = !tempTask[index].completed;
    setTasks(tempTask);
  };

  const calculateTaskPercentage = () => {
    const totalTasks = tasks.length;
    let completedTask = 0;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].completed) {
        completedTask++;
      }
    }
    return Math.floor((completedTask * 100) / totalTasks);
  };

  return (
    <Transition appear show={modalState.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[60]" onClose={handleCloseModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-250"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-250"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-500 bg-opacity-40 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0">
          <div className="absolute inset-0">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-250 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-250 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-slate-900 shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                        <input
                          className="flex-1 rounded-lg border-transparent pl-0 text-xl font-bold transition-all duration-150 ease-in hover:border-slate-500 hover:pl-3 focus:border focus:pl-3 hover:focus:border-blue-600 dark:bg-slate-900 dark:text-white dark:hover:border"
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <div className="flex h-7 items-center">
                          <button
                            className={classNames(
                              completed
                                ? "bg-emerald-700 text-white dark:bg-emerald-800"
                                : "bg-slate-300",
                              "inline-block rounded-lg py-1 px-3 text-sm font-semibold"
                            )}
                            onClick={() => setCompleted((prev) => !prev)}
                          >
                            {completed ? (
                              <span className="flex items-center gap-1">
                                <CheckIcon className="h-4 w-4" /> Completed
                              </span>
                            ) : (
                              <span className="">Mark complete</span>
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-3">
                        <span className="w-28 text-sm dark:text-slate-500">
                          Date
                        </span>
                        <Datepicker
                          value={date}
                          onChange={setDate}
                          inputClassName="border-slate-500 text-inherit dark:bg-slate-900 dark:text-white focus:outline-blue-600 focus:ring-0 font-semibold"
                        />
                      </div>
                      <div className="text-inherit"></div>
                      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-3">
                        <span className="w-28 text-sm dark:text-slate-500">
                          Description
                        </span>
                        <textarea
                          ref={descTextAreaRef}
                          className="max-h-28 w-full rounded-lg dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400 dark:hover:border placeholder:font-light"
                          placeholder="Description...."
                          value={desc}
                          onChange={(e) => setDesc(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-3">
                        <span className="w-28 text-sm dark:text-slate-500">
                          Image url
                        </span>
                        <textarea
                          ref={imageTextAreaRef}
                          className="max-h-16 w-full rounded-lg dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400 dark:hover:border placeholder:font-light"
                          placeholder="Image url...."
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-3">
                        <span className="w-28 text-sm dark:text-slate-500">
                          Tag
                        </span>
                        <div className="w-full gap-2 flex flex-wrap">
                          {tags.map((tag, index) => (
                            <button
                              className={`text-sm py-1 pl-2 pr-1 gap-1 hover:bg-opacity-80 flex font-semibold items-center rounded-lg ${tag.color}`}
                              role="button"
                              aria-label="remove tag"
                              key={index}
                              onClick={() => handleDeleteTag(index)}
                            >
                              <span className="">{tag.title}</span>
                              <XMarkIcon className="h-5 w-5" />
                            </button>
                          ))}
                          <button
                            role="button"
                            aria-label="create tag"
                            onClick={() => setOpenTagModal(true)}
                          >
                            <PlusIcon className="rounded-full border border-dashed border-slate-500 dark:border-white p-1 h-7 w-7 dark:stroke-slate-300" />
                          </button>
                          <CreateTagModal
                            show={openTagModal}
                            handleClose={setOpenTagModal}
                            handleSubmit={handleCreateTag}
                          />
                        </div>
                      </div>
                      <div className="border-t-[1px] border-slate-200 dark:border-slate-700 my-4"></div>
                      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-3">
                        <span className="w-28 text-sm dark:text-slate-500">
                          Tasks
                        </span>

                        <div className="w-full">
                          {tasks.length > 0 && (
                            <div className="my-2 w-full h-6 bg-slate-100 dark:bg-slate-500 rounded-md overflow-hidden">
                              {tasks.length > 0 && (
                                <div
                                  style={{
                                    width: `${calculateTaskPercentage()}%`,
                                  }}
                                  className="bg-green-400 h-6 justify-center flex items-center transition-transform duration-100 ease-in"
                                >
                                  {calculateTaskPercentage() > 0 &&
                                    `${calculateTaskPercentage()}%`}
                                </div>
                              )}
                            </div>
                          )}

                          {tasks.map((_t, index) => (
                            <div
                              key={index}
                              className="py-3 px-4 bg-slate-100 dark:bg-slate-800 dark:text-white mb-2 rounded-lg justify-between flex items-center"
                            >
                              <div>
                                <input
                                  type="checkbox"
                                  className="h-5 w-5 rounded-md"
                                  value={_t.completed ? "on" : "off"}
                                  checked={_t.completed}
                                  onChange={() =>
                                    handleToggleTaskCompleted(index)
                                  }
                                ></input>
                                <span className="ml-2">{_t.title}</span>
                              </div>
                              <button
                                role="button"
                                aria-label="delete task"
                                onClick={() => handleDeleteTask(index)}
                              >
                                <span className="sr-only">Delete task</span>
                                <TrashIcon className="h-5 w-5 text-red-600 hover:text-red-500" />
                              </button>
                            </div>
                          ))}
                          <AddForm
                            text="Add task"
                            placeholder="Task name..."
                            onSubmit={handleCreateTask}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="py-6 backdrop-blur-sm border-t-[1px] border-slate-700 px-4 flex justify-between">
                      <div className="">
                        <button
                          onClick={deleteCard}
                          type="button"
                          className="inline-flex items-center justify-center gap-1 rounded-md border border-transparent bg-red-700 px-3 py-1 text-base font-medium text-white transition-colors duration-150 hover:bg-red-600"
                        >
                          <TrashIcon className="h-5 w-5" />
                          Delete card
                        </button>
                      </div>
                      <div className="flex justify-end gap-2 sm:gap-3">
                        <button
                          onClick={handleSave}
                          type="button"
                          className="inline-flex items-center justify-center gap-1 rounded-md border border-transparent bg-emerald-700 px-3 py-1 text-base font-medium text-white transition-colors duration-150 hover:bg-emerald-600"
                        >
                          <DocumentCheckIcon className="h-5 w-5" />
                          Save
                        </button>
                        <button
                          onClick={handleCloseModal}
                          type="button"
                          className="inline-flex justify-center rounded-md border bg-transparent px-3 py-1 text-base font-medium transition-colors duration-150 hover:border-indigo-600 hover:ring-1 hover:ring-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 dark:text-white"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
