import { z } from "zod";
export const moodSchema = z.enum([
  "sad",
  "angry",
  "neutral",
  "happy",
  "excited",
]);

export type Mood = z.infer<typeof moodSchema>;
export const moodLogFormSchema = z.object({
  mood: moodSchema,
  note: z
    .string()
    .max(200, { message: "Note must be less than 200 characters" })
    .optional(),
});
export type MoodLogFormFields = z.infer<typeof moodLogFormSchema>;
