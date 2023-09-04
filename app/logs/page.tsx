import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { DateTime } from "luxon";

export default async function MoodLogs() {
  const supabase = createServerComponentClient({ cookies });
  const { data: moods } = await supabase.from("Moods").select();

  return (
    <main className="min-h-screen p-24">
      <h1 className="text-6xl pb-10 font-serif">Mood logs</h1>
      {!moods ? (
        <p>No logs yet</p>
      ) : (
        <ul>
          {moods.map((mood) => (
            <li key={mood.id}>
              <div className="grid grid-cols-3">
                <div>{DateTime.fromISO(mood.created_at).toLocaleString()}</div>
                <div>{mood.mood}</div>
                <div>{mood.note}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
