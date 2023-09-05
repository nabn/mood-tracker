import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthButtonServer from "@/components/auth-button-server";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mood Logger",
  description: "A simple mood logger",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "px-24 min-h-screen")}>
        <nav className="h-24 flex items-center justify-end">
          <AuthButtonServer />
        </nav>
        {children}
      </body>
    </html>
  );
}
