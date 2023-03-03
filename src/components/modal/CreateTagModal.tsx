import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import React, { Fragment, useState } from "react";

export const tagColors: string[] = [
  "bg-red-600 text-white",
  "bg-blue-600 text-white",
  "bg-green-600 text-white",
  "bg-yellow-400 text-slate-900",
  "bg-purple-600 text-white",
  "bg-teal-600 text-white",
  "bg-cyan-400 text-slate-900",
  "bg-orange-400 text-slate-900",
];

export interface ITagsProps {
  show: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (tagName: string, colorIndex: number) => void;
}

export function CreateTagModal(props: ITagsProps) {
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<number>(0);

  const handleCreate = (tagName: string, colorIndex: number) => {
    if (name === "") return;
    props.handleSubmit(name, color);
    setName("");
    props.handleClose(false);
  };

  return (
    <Transition appear show={props.show}>
      <Dialog as="div" className="relative z-[70]" onClose={props.handleClose}>
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
                  Create Tag
                </Dialog.Title>
                <div className="mt-3">
                  <input
                    type="text"
                    className="w-full rounded-lg dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400 dark:hover:border placeholder:font-light font-semibold"
                    placeholder="Tag name...."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mt-3">
                  <RadioGroup value={color} onChange={setColor}>
                    <RadioGroup.Label className="sr-only">
                      Tag color
                    </RadioGroup.Label>
                    <div className="flex gap-3 flex-wrap">
                      {tagColors.map((color, index) => (
                        <RadioGroup.Option
                          key={color}
                          value={index}
                          className={`h-10 w-10 rounded-lg flex items-center font-semibold justify-center ${color}`}
                        >
                          {({ active, checked }) =>
                            checked ? (
                              <CheckIcon className="h-7 w-7" />
                            ) : (
                              <p></p>
                            )
                          }
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div className="mt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-emerald-700 px-3 py-1 text-base font-medium text-white hover:bg-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => handleCreate(name, color)}
                  >
                    Create
                  </button>
                  <button
                    onClick={() => props.handleClose(false)}
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
