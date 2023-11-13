import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="h-full grid lg:place-items-center">
      <div className="space-y-4 lg:mb-64">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl xl:text-6xl 2xl:text-7xl">
          I have a bad news for you
        </h1>
        <p className="transition-all flex align-middle text-neutral-500 text-lg lg:text-xl xl:text-2xl">
          The page you are looking for might be removed or is temporarily
          unavailable.
        </p>
        <Link
          href={"/"}
          className="inline-block text-center px-6 py-3 font-mono w-full rounded-xl border border-neutral-200 dark:border-neutral-700 lg:text-lg bg-neutral-200 text-neutral-800 font-extrabold"
        >
          Go back
        </Link>
      </div>
    </div>
  );
};

export default NotFound;