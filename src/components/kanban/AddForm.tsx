import { CheckIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FormEvent, useEffect, useRef, useState } from "react";

export interface IAddFormProps {
  text: string;
  placeholder: string;
  onSubmit: (name: string) => void;
}

export function AddForm(props: IAddFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowForm(false);
        setName("");
      }
    };
    formRef.current?.addEventListener("keydown", handleKeyDown);
    return () => {
      formRef.current?.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (name) {
      setName("");
      props.onSubmit(name);
    } else return;
    setShowForm(false);
  };

  return (
    <div>
      {showForm ? (
        <form
          ref={formRef}
          autoComplete="off"
          onSubmit={handleSubmit}
          onBlur={() => {
            if (name) return;
            setShowForm(false);
          }}
        >
          <div className="w-64 appearance-none rounded-lg border border-slate-300 bg-slate-200 p-3   dark:border-slate-700 dark:bg-slate-900">
            <input
              className="w-full rounded-lg dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400"
              placeholder={props.placeholder}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            <div className="mt-4 flex items-center justify-between">
              <button className="flex items-center gap-1 rounded-md bg-emerald-600 px-3 py-1 text-sm text-white transition-colors duration-150 ease-in-out hover:bg-emerald-500">
                <CheckIcon className="h-5 w-5" />
                Add
              </button>
              <button
                onClick={() => {
                  setName("");
                  setShowForm(false);
                }}
                className="rounded-md p-2 text-red-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="flex min-w-[256px] items-center justify-center gap-1 rounded-lg border border-slate-300 bg-slate-200 py-2 px-3 text-sm font-semibold transition-colors duration-200 hover:border-indigo-600 hover:bg-indigo-100/50 focus:border-none focus:border-indigo-600 focus:outline-none focus:ring focus:ring-indigo-600 dark:border-slate-500 dark:bg-slate-600 dark:text-white dark:hover:border-indigo-600 dark:hover:bg-indigo-900/20"
        >
          <PlusIcon className="h-4 w-5" />
          {props.text}
        </button>
      )}
    </div>
  );
}
