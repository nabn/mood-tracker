import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { Routes } from "@/routes";
import { Button } from "@/components/ui/button";
import MoodLogEntry from "@/components/log-entry";
import { PlusIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Mood Logger",
  description: "A simple mood logger",
};

// Entries per page
// Note: pagination not implemented
const PAGE_SIZE = 7;

export default async function MoodLogs() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect(Routes.login);
  }

  const { data: moods } = await supabase
    .from("moods")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(PAGE_SIZE);

  return (
    <main>
      {!moods || moods.length == 0 ? (
        <section>
          <Link href={Routes.logMood}>
            <PlusIcon />
            <span className="pl-2">Log your mood</span>
          </Link>
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
        <section>
          <h2 className="text-2xl py-4 font-semibold">
            Your recent mood logs
          </h2>
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
