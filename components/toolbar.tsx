import { Routes } from "@/routes";
import { HomeIcon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import AuthButtonServer from "./auth-button-server";
import { Button } from "./ui/button";

export function Toolbar({ showLog = true }: { showLog?: boolean }) {
  return (
    <ul role="menubar" className="flex gap-2 justify-end">
      <li>
        <Button variant="link" asChild>
          {showLog ? (
            <Link href={Routes.logMood}>
              <PlusIcon />
              <span className="pl-2">Log your mood</span>
            </Link>
          ) : (
            <Link href={Routes.home}>
              <HomeIcon />
              <span className="pl-2">Home</span>
            </Link>
          )}
        </Button>
      </li>
      <li>
        <AuthButtonServer />
      </li>
    </ul>
  );
}
