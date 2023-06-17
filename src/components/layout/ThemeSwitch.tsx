import { useEffect } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import useLocalStorage from "../../hooks/useLocalStorage";

type ThemeSwitchProps = {
  buttonClass?: string;
  sunSvgClass?: string;
  moonSvgClass?: string;
};

export default function ThemeSwitch(props: ThemeSwitchProps) {
  const [theme, setTheme] = useLocalStorage<"dark" | "light">("theme", "light");

  const handleToggle = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.documentElement.setAttribute("class", theme);
  }, [theme]);

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
