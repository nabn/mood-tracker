"use client";

import { Urls } from "@/urls";
import { Maybe } from "@/lib/type-utils";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthButtonClient({
  session,
}: {
  session: Maybe<Session>;
}) {
  const supabase = createClientComponentClient<Database>();
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
        <ul className="flex gap-5">
          <li>
            <Link href={Urls.logMood}>Log your mood</Link>
          </li>
          <li>
            <button onClick={handleSignout}>Logout</button>
          </li>
        </ul>
      ) : (
        <button onClick={handleSignin}>Login</button>
      )}
    </>
  );
}
