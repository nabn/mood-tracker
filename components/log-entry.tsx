import { cn } from "@/lib/utils";
import { Mood } from "@/schema/mood";
import { cva } from "class-variance-authority";
import { DateTime } from "luxon";

const moodVariants = cva("border rounded p-3 mb-2 max-w-[72ch] shadow-md", {
  variants: {
    variant: {
      sad: "bg-zinc-100",
      angry: "bg-red-100",
      neutral: "bg-neutral-100",
      happy: "bg-teal-100",
      excited: "bg-fuchsia-100",
    },
  },
});

export default function MoodLogEntry({ mood }: { mood: DBMood }) {
  return (
    <div className={cn(moodVariants({ variant: mood.mood as Mood }))}>
      <div className="text-xs">
        {DateTime.fromISO(mood.created_at).toFormat("MMM d")}
      </div>
      <h1 className="text-2xl font-semibold text-zinc-600 uppercase">{mood.mood}</h1>
      <div>{mood.note}</div>
    </div>
  );
}
