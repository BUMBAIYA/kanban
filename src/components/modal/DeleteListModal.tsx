import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import KanbanContext from "../../context/kanbanContext";

export interface DeleteListModalProps {
  title: string;
  listIndex: number;
}

export function DeleteListModal(props: DeleteListModalProps) {
  const { handleDeleteList, handleCloseModal, modalState } =
    useContext(KanbanContext);

  const handleDelete = () => {
    handleDeleteList(props.listIndex);
    handleCloseModal();
  };

  return (
    <Transition appear show={modalState.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40 dark:bg-slate-500 dark:bg-opacity-40" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-slate-900">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-semibold leading-6 text-gray-900 dark:text-white"
                >
                  Delete
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-slate-900 dark:text-white">
                    Are you sure want to delete list{" "}
                    <span className="font-bold text-indigo-700 dark:text-indigo-500">
                      {props.title}
                    </span>{" "}
                    ?
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-xs font-semibold text-red-500">
                    <span className="font-bold">NOTE:</span> All tasks related
                    to this list will also be deleted.
                  </p>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    onClick={handleDelete}
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-3 py-1 text-sm font-medium text-white transition-colors duration-150 hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={handleCloseModal}
                    type="button"
                    className="inline-flex justify-center rounded-md border bg-transparent px-3 py-1 text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-indigo-600 hover:border-indigo-600 hover:ring-1 hover:ring-indigo-600 dark:text-white"
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
