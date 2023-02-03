import { useEffect } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

type ThemeSwitchProps = {
  buttonClass?: string;
  sunSvgClass?: string;
  moonSvgClass?: string;
};

export default function ThemeSwitch(props: ThemeSwitchProps) {
  const handleToggle = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.getItem("theme") === "light"
      ? localStorage.setItem("theme", "dark")
      : localStorage.setItem("theme", "light");
  };

  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      let isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isDark) {
        localStorage.setItem("theme", "dark");
        document.documentElement.setAttribute("class", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    } else {
      if (localStorage.getItem("theme") === "dark")
        document.documentElement.setAttribute("class", "dark");
    }
  }, []);

  return (
    <button
      onClick={handleToggle}
      type="button"
      aria-label="toggle theme"
      className={props.buttonClass}
    >
      <span className="sr-only">Toggle theme</span>
      <SunIcon className={props.sunSvgClass} />
      <MoonIcon className={props.moonSvgClass} />
    </button>
  );
}
