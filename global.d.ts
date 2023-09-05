import { Database as DB } from "@/lib/database.types";
import { Mood } from "./schema/mood";
declare global {
  type Database = DB;
  type DBMood = DB["public"]["Tables"]["moods"]["Row"]
}
