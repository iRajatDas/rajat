"use client";

import React from "react";
import { Moon, Lightbulb } from "lucide-react";
import { useTheme } from "next-themes";
import ClientOnly from "@/components/client-only";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  return (
    <ClientOnly>
      <button
        onClick={toggleTheme}
        className="h-10 w-10 rounded-full border text-neutral-700 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700 grid place-items-center"
      >
        {theme === "dark" ? (
          <Lightbulb className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </button>
    </ClientOnly>
  );
};

export default ThemeToggle;
