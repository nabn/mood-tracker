import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { DateTime } from "luxon";
import { redirect } from "next/navigation";
import { Routes } from "@/routes";

export default async function MoodLogs() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect(Routes.home);
  }

  const { data: moods } = await supabase
    .from("moods")
    .select("*, author: profiles(*)");

  return (
    <main className="min-h-screen p-24">
      <h1 className="text-6xl pb-10 font-serif">Mood logs</h1>
      {!moods ? (
        <p>No logs yet</p>
      ) : (
        <ul>
          {moods.map((mood) => (
            <li key={mood.id} className="flex gap-5">
              <div>{DateTime.fromISO(mood.created_at).toFormat("MMM d")}</div>
              <div>{mood.mood}</div>
              <div>{mood.note}</div>
              <div>{mood.author?.username}</div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

