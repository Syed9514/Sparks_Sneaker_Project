import { createContext, useContext, useEffect, useState } from "react";

const themes = {
  light: {
    primary: "#000000",
    secondary: "#9d4edd",
    accent: "#c77dff",
    background: "#fff",
    cardBg: "#f8f8ff",
    text: "#000",
    buttonBg: "#9d4edd",
    buttonHover: "#c77dff",
  },
  dark: {
    primary: "#ffffff",
    secondary: "#c77dff",
    accent: "#e0aaff",
    background: "#18122B",
    cardBg: "#231942",
    text: "#fff",
    buttonBg: "#c77dff",
    buttonHover: "#e0aaff",
  },
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "dark" || stored === "light") return stored;
    } catch (err) {
      // ignore
    }
    // fallback to system preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const root = document.documentElement;
    const t = themes[theme];
    root.style.setProperty("--primary", t.primary);
    root.style.setProperty("--secondary", t.secondary);
    root.style.setProperty("--accent", t.accent);
    root.style.setProperty("--background", t.background);
    root.style.setProperty("--card-bg", t.cardBg);
    root.style.setProperty("--text", t.text);
    root.style.setProperty("--button-bg", t.buttonBg);
    root.style.setProperty("--button-hover", t.buttonHover);
    // Apply theme classes/attribute on root so CSS can target them globally
    try {
      root.setAttribute('data-theme', theme);
      root.classList.toggle('theme-dark', theme === 'dark');
      root.classList.toggle('theme-light', theme === 'light');
    } catch (err) {
      // ignore in non-DOM environments
    }
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeColors: themes[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
