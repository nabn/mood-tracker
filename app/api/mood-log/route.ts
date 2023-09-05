import { moodLogFormSchema } from "@/schema/mood";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ZodIssue } from "zod";

// Strips out noise from validation error and transforms to a more readable form
const transformIssues = (issues: ZodIssue[]) => ({
  issues: Object.fromEntries(
    issues.map((issue) => [issue.path.join(":"), issue.message])
  ),
});

// While this can be an api route, I've implemented this in component code that will still be securely run in the server
//
// const PAGE_SIZE = 7;
// export async function GET() {
//   const supabase = createRouteHandlerClient<Database>({ cookies });
//   const { data: moods } = await supabase
//     .from("moods")
//     .select("*")
//     .order("created_at", { ascending: false })
//     .limit(PAGE_SIZE);
//   return NextResponse.json({ moods });
// }

export async function POST(request: Request) {
  const body = await request.json();

  const parseResult = moodLogFormSchema.safeParse(body);

  if (!parseResult.success) {
    return NextResponse.json(transformIssues(parseResult.error.issues), {
      status: 400,
    });
  }

  const { mood, note } = parseResult.data;
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  await supabase.from("moods").insert({ mood, note, user_id: user?.id });
  return NextResponse.json({ ok: true });
}
