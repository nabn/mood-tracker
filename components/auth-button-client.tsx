"use client";

import { Maybe } from "@/lib/type-utils";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ExitIcon } from "@radix-ui/react-icons";
import { Routes } from "@/routes";

export default function AuthButtonClient({
  session,
}: {
  session: Maybe<Session>;
}) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handleSignout = async () => {
    await supabase.auth.signOut();
    router.refresh()
    router.replace(Routes.home);
  };

  return (
    session && (
      <Button variant="link" onClick={handleSignout}>
        <ExitIcon />
        <span className="pl-2">Logout</span>
      </Button>
    )
  );
}
