"use client";
import { Routes } from "@/routes";
import { PlusIcon, HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export default function RouteButton() {
  const pathname = usePathname();

  return pathname == Routes.home ? (
    <Button variant="link" asChild>
      <Link href={Routes.logMood}>
        <PlusIcon />
        <span className="pl-2">Log your mood</span>
      </Link>
    </Button>
  ) : pathname == Routes.logMood ? (
    <Button variant="link" asChild>
      <Link href={Routes.home}>
        <HomeIcon />
        <span className="pl-2">Home</span>
      </Link>
    </Button>
  ) : null;
}
