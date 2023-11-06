"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function NavItem({
  path,
  name,
}: {
  path: string;
  name: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === path;
  return (
    <Link
      key={path}
      href={path}
      className={cn(
        "transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle",
        !isActive && "text-neutral-500"
      )}
    >
      <span className="relative py-1 px-2">
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
