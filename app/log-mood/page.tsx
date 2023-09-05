import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Routes as Routes } from "@/routes";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function LogMood() {
  async function logMood(formData: FormData) {
    "use server";
    const mood = String(formData.get("mood"));
    const note = String(formData.get("note"));
    const supabase = createServerActionClient<Database>({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("moods").insert({ mood, note, user_id: user?.id });
    }
    redirect(Routes.home);
  }

  return (
    <form action={logMood} className="mt-10 flex flex-col gap-4 items-start">
      <h1 className="text-4xl text-zinc-700 py-4 font-serif font-semibold">
        Log your mood
      </h1>

      <label htmlFor="mood" className="text-zinc-500">
        How are you feeling today?
      </label>
      <Select name="mood">
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sad">Sad</SelectItem>
          <SelectItem value="Angry">Angry</SelectItem>
          <SelectItem value="neutral">Neutral</SelectItem>
          <SelectItem value="happy">Happy</SelectItem>
          <SelectItem value="excited">Excited</SelectItem>
        </SelectContent>
      </Select>

      <label htmlFor="note" className="text-zinc-500">
        Add a note
      </label>
      <Textarea name="note" placeholder="Add a note.." className="h-44" />

      <Button type="submit">
        <PaperPlaneIcon />
        <span className="pl-2">Submit</span>
      </Button>
    </form>
  );
}
