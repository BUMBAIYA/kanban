import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import KanbanContext from "../../context/kanbanContext";

export interface RenameListModalProps {
  listIndex: number;
  title: string;
}

export default function RenameListModal(props: RenameListModalProps) {
  const [title, setTitle] = useState<string>(props.title);

  const { modalState, handleCloseModal, handleRenameList } =
    useContext(KanbanContext);

  const handleRename = () => {
    if (title === "") return;
    handleRenameList(props.listIndex, title);
    handleCloseModal();
  };

  return (
    <Transition appear show={modalState.isOpen}>
      <Dialog as="div" className="relative z-40" onClose={handleCloseModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-500 bg-opacity-40"></div>
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-slate-900 dark:text-white"
                >
                  Edit list name
                </Dialog.Title>
                <div className="mt-3">
                  <input
                    type="text"
                    className="w-full rounded-lg dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400 dark:hover:border placeholder:font-light font-semibold"
                    placeholder="Tag name...."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="mt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-emerald-700 px-3 py-1 text-base font-medium text-white hover:bg-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={handleRename}
                  >
                    Rename
                  </button>
                  <button
                    onClick={handleCloseModal}
                    type="button"
                    className="inline-flex justify-center rounded-md border bg-transparent px-3 py-1 text-base font-medium transition-colors duration-150 hover:border-indigo-600 hover:ring-1 hover:ring-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 dark:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
