"use client";

import React, { FC } from "react";
import { Moon, Lightbulb } from "lucide-react";
import { useTheme } from "next-themes";
import ClientOnly from "@/components/client-only";
import { cn } from "@/lib/utils";

type ThemeToggleProps = React.HTMLProps<HTMLButtonElement>;

const ThemeToggle: FC<ThemeToggleProps> = ({ ...props }) => {
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
        {...props}
        onClick={toggleTheme}
        className={cn(
          "h-10 w-10 rounded-full border text-neutral-700 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700 grid place-items-center",
          props.className
        )}
        type="button"
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
