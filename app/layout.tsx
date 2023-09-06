import { Toolbar } from "@/components/toolbar";
import "./globals.css";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Mood Logger",
  description: "A simple mood logger",
};

export const dynamic = "force-dynamic";
export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="p-2 lg:px-20 md:w-[72ch]">
        <header className="flex justify-between items-center py-10">
          <p className="text-4xl text-zinc-700 font-serif font-semibold">
            Mood tracker
          </p>
          <Toolbar />
        </header>
        {children}
      </body>
    </html>
  );
}
