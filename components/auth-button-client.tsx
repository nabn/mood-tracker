"use client";

import { Maybe } from "@/lib/type-utils";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LoginWithGithub } from "./login-button";
import { PinRightIcon } from "@radix-ui/react-icons";

export default function AuthButtonClient({
  session,
}: {
  session: Maybe<Session>;
}) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handleSignout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <>
      {session ? (
        <Button variant="link" onClick={handleSignout}>
          <PinRightIcon />
          <span className="pl-2">Logout</span>
        </Button>
      ) : (
        <LoginWithGithub client={supabase} />
      )}
    </>
  );
}
