import { GithubLogo } from "../kanban/GithubLogo";
import ThemeSwitch from "./ThemeSwitch";

export default function Navbar() {
  return (
    <nav className="fixed top-0 flex w-full bg-slate-200 dark:bg-slate-600 px-2 sm:px-4">
      <div className="flex-1 flex">
        <h1 className="flex items-center text-2xl px-4 dark:text-slate-300 font-semibold py-1">
          Kanban
        </h1>
      </div>
      <div className="p-3 flex gap-4">
        <ThemeSwitch
          buttonClass="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
          sunSvgClass="h-5 w-5 stroke-zinc-900 dark:hidden"
          moonSvgClass="hidden h-5 w-5 dark:block stroke-slate-300"
        />
        <a href="https://github.com/BUMBAIYA/kanban">
          <GithubLogo />
        </a>
      </div>
    </nav>
  );
}
