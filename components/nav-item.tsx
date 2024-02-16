"use client";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

// type props
type NavItemProps = React.HTMLProps<HTMLAnchorElement> & {
  path: string;
  name: string;
  textClassName?: string;
};

export default function NavItem({ path, name, ...props }: NavItemProps) {
  const segment = useSelectedLayoutSegment();
  const isActive = `/${segment ?? ""}` === path;

  return (
    <Link
      key={path}
      href={path}
      className={cn(
        "transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle snap-center",
        !isActive && "text-neutral-700 dark:text-neutral-500",
        props.className
      )}
    >
      <span className={cn("relative py-1 px-2", props.textClassName)}>
        {name}
        {isActive ? (
          <motion.div
            className="absolute h-[1px] top-7 mx-2 inset-0 bg-neutral-200 dark:bg-neutral-800 z-[-1] dark:bg-gradient-to-r from-transparent to-neutral-900"
            layoutId="sidebar"
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 30,
            }}
          />
        ) : null}
      </span>
    </Link>
  );
}
