"use client";
// import { AnimatePresence, motion, useInView } from "framer-motion";
import { LayoutGroup } from "framer-motion";
import NavItem from "./nav-item";
import React, { Suspense } from "react";
// import { cn } from "@/lib/utils";

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
  // const navRef = React.useRef<HTMLElement>(null);

  // const inView = useInView(navRef, {
  // margin: "30px",
  // });

  return (
    <>
      {/* <AnimatePresence>
        {!inView ? (
          <motion.header
            // slide from to to bottom and exit to top
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 350,
              damping: 30,
            }}
            className={cn("fixed inset-0 w-full max-w-2xl mx-auto h-fit top-0")}
          >
            <LayoutGroup>
              <nav
                ref={navRef}
                className={cn(
                  "flex flex-row items-center gap-4 justify-between relative pb-0 fade md:overflow-auto scroll-pr-6 md:relative",
                  "py-4 px-2 bg-neutral-900/70 border border-neutral-200 dark:border-neutral-700 backdrop-blur-xl mt-4 rounded-md m-4 sm:mx-0 sm:mb-0 sm:mt-4"
                )}
                id="nav"
              >
                <div className="h-10 w-10 rounded-full border-4 border-rose-500 bg-rose-200"></div>
                <div className="flex flex-row space-x-0">
                  <Suspense fallback={null}>
                    {Object.entries(navItems).map(([path, { name }]) => {
                      return <NavItem key={path} path={path} name={name} />;
                    })}
                  </Suspense>
                </div>
              </nav>
            </LayoutGroup>
          </motion.header>
        ) : null}
      </AnimatePresence> */}
      <header className="-ml-2 mb-16 tracking-tight">
        <div className="lg:sticky lg:top-20">
          <LayoutGroup>
            <nav
              // ref={navRef}
              className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
              id="nav"
            >
              <div className="flex flex-row space-x-0 pr-10">
                <Suspense fallback={null}>
                  {Object.entries(navItems).map(([path, { name }]) => {
                    return <NavItem key={path} path={path} name={name} />;
                  })}
                </Suspense>
              </div>
            </nav>
          </LayoutGroup>
        </div>
      </header>
    </>
  );
}
