import { z } from "zod";
const mood = z.enum(["sad", "angry", "neutral", "happy", "excited"]);
export type Mood = z.infer<typeof mood>;
