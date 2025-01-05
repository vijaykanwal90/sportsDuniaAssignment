
'use client'
import React from "react";
import { useTheme } from "../app/Context/Theme";
import { Moon, Sun } from "lucide-react";

const ThemeToggler: React.FC = () => {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} aria-label="Toggle Theme" className="p-2 rounded-full focus:outline-none">
      {themeMode === "light" ? <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" /> : <Sun className="w-5 h-5 text-yellow-400 dark:text-yellow-500" />}
    </button>
  );
};

export default ThemeToggler;
