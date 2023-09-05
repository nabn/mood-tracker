import { Toolbar } from "@/components/toolbar";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Log mood",
  description: "Add a mood log entry",
};

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="p-2 lg:px-20 md:w-[72ch]">
        <Toolbar showLog={false} />
        {children}
      </body>
    </html>
  );
}
