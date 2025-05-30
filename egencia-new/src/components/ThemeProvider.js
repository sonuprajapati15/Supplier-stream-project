import { createElement as h, useState, useEffect } from "react";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return h('div', { className: `theme-provider ${theme}` }, [
    h('button', {
      className: "theme-toggle",
      onClick: toggleTheme,
      title: "Toggle theme"
    }, theme === "dark" ? "🌙" : "☀️"),
    children
  ]);
}