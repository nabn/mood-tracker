import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonServer from "@/components/auth-button-server";
import Link from "next/link";
import { Routes } from "@/routes";
import { Button } from "@/components/ui/button";
import MoodLogEntry from "@/components/log-entry";
import { PlusIcon } from "@radix-ui/react-icons";
import { Toolbar } from "@/components/toolbar";

// Entries per page
// Note: pagination not implemented
const PAGE_SIZE = 7;

export default async function MoodLogs() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: moods } = await supabase
    .from("moods")
    .select("*")
    .limit(PAGE_SIZE);

  return (
    <main>
      {!session ? (
        <section className="p-8 h-[100vh] flex flex-col items-center justify-center">
          <p className="pb-2 text-xl">Log in to view your mood logs</p>
          <AuthButtonServer />
        </section>
      ) : !moods ? (
        <section className="p-2 md:mx-auto md:w-[72ch]">
          <Toolbar />
          <div className="flex flex-col items-center">
            <h1 className="text-2xl text-zinc-500 py-4 px-2">
              Nothing logged yet
            </h1>
            <p className="text-zinc-500 pb-8">
              Once you have added some mood logs, they will appear here.
            </p>
            <Link href={Routes.logMood}>
              <Button>
                <PlusIcon />
                <span className="pl-2">Add a mood log</span>
              </Button>
            </Link>
          </div>
        </section>
      ) : (
        <section className="p-2 md:mx-auto md:w-[72ch]">
          <Toolbar />
          <h1 className="text-4xl py-4 px-2 font-serif font-semibold">
            Mood logs
          </h1>
          <ul>
            {moods.map((mood) => (
              <li key={mood.id}>
                <MoodLogEntry key={mood.id} mood={mood} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
