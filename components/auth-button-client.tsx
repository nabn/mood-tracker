"use client";

import { Urls } from "@/urls";
import { Maybe } from "@/util/types";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function AuthButtonClient({ session }: { session: Maybe<Session> }) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: Urls.authCallback },
    });
  };

  const handleSignout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <>
      {session ? (
        <button onClick={handleSignout}>Logout</button>
      ) : (
        <button onClick={handleSignin}>Login</button>
      )}
    </>
  );
}
