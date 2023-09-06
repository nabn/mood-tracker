"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Routes } from "@/routes";
import { moodLogFormSchema, type MoodLogFormFields } from "@/schema/mood";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function LogMood() {
  const router = useRouter();
  const form = useForm<MoodLogFormFields>({
    resolver: zodResolver(moodLogFormSchema),
    defaultValues: {},
  });

  async function logMood(fields: MoodLogFormFields) {
    await fetch(Routes.api.moodLog, {
      method: "POST",
      body: JSON.stringify(fields),
    }).then((res) => res.json());

    router.refresh();
    router.push(Routes.home);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(logMood)}>
        <h1 className="text-2xl text-zinc-700 font-semibold">
          Log your mood
        </h1>
        <p className="text-zinc-500 py-2">
          Take a second to log how you&apos;ve felt today.
        </p>

        <br className="my-8" />
        <FormField
          control={form.control}
          name="mood"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mood</FormLabel>
              <FormDescription>
                How has your mood been today overall?
              </FormDescription>
              <FormControl>
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a mood" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sad">Sad</SelectItem>
                    <SelectItem value="angry">Angry</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="happy">Happy</SelectItem>
                    <SelectItem value="excited">Excited</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <br className="my-8" />

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add a note </FormLabel>
              <FormDescription>Max 200 characters</FormDescription>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-8">
          <PaperPlaneIcon />
          <span className="pl-2">Submit</span>
        </Button>
      </form>
    </Form>
  );
}
