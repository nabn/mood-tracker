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
    <form action={logMood} className="bg-inherit flex flex-col gap-4">
      <Select name="mood">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a mood" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sad">Sad</SelectItem>
          <SelectItem value="Angry">Angry</SelectItem>
          <SelectItem value="neutral">Neutral</SelectItem>
          <SelectItem value="happy">Happy</SelectItem>
          <SelectItem value="excited">Excited</SelectItem>
        </SelectContent>
      </Select>

      <Textarea name="note" placeholder="Add a note.." />

      <Button type="submit">Submit</Button>
    </form>
  );
}
