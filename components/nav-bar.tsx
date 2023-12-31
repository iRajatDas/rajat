"use client";
import { LayoutGroup } from "framer-motion";
import NavItem from "./nav-item";
import React, { Suspense } from "react";
import ThemeToggle from "@/components/theme-toggle";

const navItems = {
  "/": {
    name: "home",
  },
  "/blog": {
    name: "blog",
  },
  "/snippets": {
    name: "snippets",
  },
};

export default function Navbar() {
  return (
    <>
      <header className="-ml-2 mb-16 tracking-tight">
        <LayoutGroup>
          <nav
            
            // ref={navRef}
            className="flex flex-row items-center justify-between relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
            id="nav"
          >
            <div className="flex flex-row space-x-0 pr-10">
              <Suspense fallback={null}>
                {Object.entries(navItems).map(([path, { name }]) => {
                  return <NavItem key={path} path={path} name={name} />;
                })}
              </Suspense>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </nav>
        </LayoutGroup>
      </header>
    </>
  );
}
