import { Menu, Transition } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useContext } from "react";
import KanbanContext from "../../context/kanbanContext";
import { classNames } from "../../utility/css";

export interface IListMenuProps {
  title: string;
  listIndex: number;
}

export function ListMenu(props: IListMenuProps) {
  const { handleOpenModal } = useContext(KanbanContext);

  return (
    <Menu as="div" className="relative">
      <Menu.Button aria-label="Show menu" className="flex items-center">
        <EllipsisVerticalIcon className="h-5 w-5 cursor-pointer rounded-full transition-colors duration-100" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 focus:outline-none focus:ring-indigo-600 dark:bg-slate-900">
          <div className="p-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active
                      ? "bg-indigo-500 text-white"
                      : "text-gray-900 dark:text-white"
                  } group flex w-full items-center rounded-md px-2 py-2 text-xs font-semibold`}
                  onClick={() =>
                    handleOpenModal({
                      type: "RENAME_LIST",
                      modalProps: {
                        listIndex: props.listIndex,
                        title: props.title,
                      },
                    })
                  }
                >
                  <PencilIcon className="mr-2 h-4 w-4" />
                  Rename list
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active
                      ? "bg-red-500 text-white"
                      : "text-gray-900 dark:text-white",
                    "group flex w-full items-center rounded-md px-2 py-2 text-xs font-semibold",
                  )}
                  onClick={() =>
                    handleOpenModal({
                      type: "DELETE_LIST",
                      modalProps: {
                        listIndex: props.listIndex,
                        title: props.title,
                      },
                    })
                  }
                >
                  <TrashIcon className="mr-2 h-4 w-4" />
                  Delete list
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
