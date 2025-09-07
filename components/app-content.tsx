"use client";

import { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";
import ThemeColorProvider from "./theme-color-provider";
import { Toaster } from "@/components/ui/toaster";

interface AppContentProps {
  children: ReactNode;
}

export default function AppContent({ children }: AppContentProps) {
  return (
    <>
      <ThemeColorProvider />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <Toaster />
    </>
  );
}
