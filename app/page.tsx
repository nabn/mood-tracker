import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <main className="h-full">
      {session ? (
        <ul>
          <li>
            <Link href="/logs">View mood logs</Link>
          </li>
        </ul>
      ) : (
        <p className="text-center h-max text-slate-500">
          Please sign in to view your mood logs
        </p>
      )}
    </main>
  );
}
