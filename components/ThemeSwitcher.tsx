"use client";

import { Palette, Check } from "lucide-react";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Change theme"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="theme-trigger"
      >
        <Palette size={16} />
        <span className="hidden sm:inline">Theme</span>
      </button>
      {open && (
        <div className="theme-menu" role="menu">
          <div className="theme-menu-title">Choose your mood</div>
          {themes.map((item) => (
            <button
              key={item.id}
              type="button"
              role="menuitem"
              onClick={() => { setTheme(item.id); setOpen(false); }}
              className={`theme-option ${theme === item.id ? "active" : ""}`}
            >
              <span className={`theme-dot theme-dot-${item.id}`} />
              <span className="min-w-0 text-left">
                <strong>{item.name}</strong>
                <small>{item.description}</small>
              </span>
              {theme === item.id && <Check size={15} className="ml-auto" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
