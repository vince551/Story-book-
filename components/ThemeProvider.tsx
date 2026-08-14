"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "paper" | "midnight" | "rose" | "forest";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: { id: Theme; name: string; description: string }[];
};

const themes: ThemeContextValue["themes"] = [
  { id: "paper", name: "Paper", description: "Warm editorial" },
  { id: "midnight", name: "Midnight", description: "Quiet dark" },
  { id: "rose", name: "Rose", description: "Soft romantic" },
  { id: "forest", name: "Forest", description: "Calm botanical" },
];

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("paper");

  useEffect(() => {
    const saved = window.localStorage.getItem("storybook-theme") as Theme | null;
    const next = themes.some((item) => item.id === saved) ? saved! : "paper";
    setThemeState(next);
    document.documentElement.dataset.theme = next;
  }, []);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("storybook-theme", next);
  };

  const value = useMemo(() => ({ theme, setTheme, themes }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
