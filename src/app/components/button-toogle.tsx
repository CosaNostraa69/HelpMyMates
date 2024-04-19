// ./components/Button.tsx
"use client";
import { useTheme } from "next-themes";

export const Button = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button onClick={toggleTheme}>
      {theme === "light" ? "Switch to Dark" : "Switch to Light"}
    </button>
  );
};