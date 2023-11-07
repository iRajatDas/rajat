"use client";
import React, { forwardRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly = forwardRef<HTMLDivElement, ClientOnlyProps>(
  ({ children }, ref) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    return (
      <AnimatePresence>
        {isMounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            ref={ref}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

ClientOnly.displayName = "ClientOnly";

export default ClientOnly;
