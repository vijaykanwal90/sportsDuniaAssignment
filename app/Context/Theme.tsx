'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define types for the context value
interface ThemeContextType {
  themeMode: "light" | "dark";
  toggleTheme: () => void;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType>({
  themeMode: "light", // Default theme
  toggleTheme: () => {}, // Default function (no-op)
});

// Define the provider props
interface ThemeProviderProps {
  children: ReactNode;
}

// ThemeProvider component that wraps your application
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  // Sync the theme with localStorage to persist the theme on page reload
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setThemeMode(savedTheme as "light" | "dark");
    }
  }, []);

  // Toggle theme mode
  const toggleTheme = () => {
    const newTheme = themeMode === "light" ? "dark" : "light";
    setThemeMode(newTheme);
    localStorage.setItem("theme", newTheme); // Persist the theme to localStorage
  };

  // Apply the `dark` class to the root element (html or body)
  useEffect(() => {
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => {
  return useContext(ThemeContext);
};
