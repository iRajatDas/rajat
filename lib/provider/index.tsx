"use client";
import React, { FC } from "react";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./auth-provider";
import { EdgeStoreProvider } from "./edge-storage-provider";

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: FC<ProviderProps> = ({ children }) => {
  return (
    <ThemeProvider
      defaultTheme="light"
      enableSystem={false}
      attribute="class"
      storageKey="theme"
    >
      <AuthProvider>
        <EdgeStoreProvider>{children}</EdgeStoreProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Provider;
