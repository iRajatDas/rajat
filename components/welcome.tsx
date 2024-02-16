"use client";
import React from "react";
import { motion } from "framer-motion";

const handVariants = {
  waving: {
    rotate: [0, -3, 6, -9, 12, -9, 6, -3, 0, 3, -6, 9, -12, 9, -6, 3, 0],
    transition: {
      duration: 2.5,
      repeat: Infinity,
    },
  },
};

const Welcome = ({ name = "Rajot" }: { name?: string }) => {
  return (
    <h1
      className="font-semibold text-2xl mb-8 tracking-tighter w-fit"
      title="Rajot Kumar Das"
    >
      hey, I&apos;m{" "}
      <span className="underline underline-offset-4 decoration-muted-foreground">
        {name}
      </span>{" "}
      <motion.span
        role="img"
        aria-label="waving hand"
        className="inline-block"
        variants={handVariants}
        animate="waving"
        viewport={{ once: true }}
      >
        👋
      </motion.span>
    </h1>
  );
};

export default Welcome;
