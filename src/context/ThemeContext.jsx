import { createContext, useContext, useEffect, useState } from "react";

// 1️⃣ Theme Context yaratamiz
const ThemeContext = createContext();

// 2️⃣ ThemeProvider komponenti
export function ThemeProvider({ children }) {
  // localStorage'dan theme-ni olish
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Theme o'zgartirish funksiyasi
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3️⃣ Contextni ishlatish uchun `useTheme` hook
export function useTheme() {
  return useContext(ThemeContext);
}
