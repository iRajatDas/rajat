"use client";
import React from "react";
import Logo from "@/components/brand";
import { motion } from "framer-motion";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

const logos = [
  { component: Logo.Resend, label: "Resend" },
  { component: Logo.ReactEmail, label: "ReactEmail" },
  { component: Logo.TailwindCSS, label: "TailwindCSS" },
  { component: Logo.Puppeteer, label: "Puppeteer" },
  { component: Logo.Twillio, label: "Twillio" },
  { component: Logo.Cloudflare, label: "Cloudflare" },
  { component: Logo.RadixUI, label: "RadixUI" },
];

const LibraryCloud = () => {
  return (
    <section className="my-8 w-full flex flex-wrap gap-2">
      {logos.map(({ component: BrandLogo, label }, idx) => (
        <motion.div
          key={label}
          className="snap-start border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded flex items-center justify-between px-3 py-4"
          variants={fadeInAnimationVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{
            delay: idx * 0.08,
            type: "tween",
          }}
        >
          <BrandLogo />
          {label === "Puppeteer" ? (
            <span className="font-semibold ml-2 select-none">{label}</span>
          ) : null}
        </motion.div>
      ))}
    </section>
  );
};

export default LibraryCloud;
