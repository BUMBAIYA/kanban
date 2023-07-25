import { useEffect, useRef } from "react";
import ThemeSwitch from "./ThemeSwitch";
import LogoIcon from "../kanban/LogoIcon";

export interface INavbarProps {}

export function Navbar(props: INavbarProps) {
  const navRef = useRef<HTMLDivElement>(null);
  function scale(
    number: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number,
  ) {
    return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }
  const onScroll = (e: Event) => {
    e.stopPropagation();
    const scrolledHeight = document.documentElement.scrollTop;
    if (scrolledHeight < 60) {
      navRef.current?.style.setProperty(
        "--bg-opacity-light",
        "" + scale(scrolledHeight, 1, 59, 0.4, 0.9),
      );
      navRef.current?.style.setProperty(
        "--bg-opacity-dark",
        "" + scale(scrolledHeight, 1, 59, 0.2, 0.8),
      );
    }
  };

  useEffect(() => {
    window.onscroll = onScroll;
  }, []);

  return (
    <header className="contents">
      <div className="fixed inset-0 top-0 z-50 flex h-14 items-center justify-center">
        <div
          className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 bg-white/[var(--bg-opacity-light)] px-4 backdrop-blur-sm transition dark:bg-slate-900/[var(--bg-opacity-dark)] dark:backdrop-blur sm:px-6 lg:z-30 lg:px-8"
          ref={navRef}
        >
          <div className="absolute inset-x-0 top-full h-px bg-zinc-900/10 transition dark:bg-white/10"></div>
          <h1 className="flex items-center gap-2 py-1 text-2xl font-bold dark:text-slate-300">
            <span className="h-7">
              <LogoIcon />
            </span>
            <span className="hidden md:inline">Kanban</span>
          </h1>
          <div className="flex items-center gap-5">
            <ThemeSwitch
              buttonClass="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
              sunSvgClass="h-5 w-5 stroke-zinc-900 dark:hidden"
              moonSvgClass="hidden h-5 w-5 dark:block stroke-slate-300"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
