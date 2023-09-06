import { Routes } from "@/routes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginWithGithub } from "./login-with-github-btn";

export const dynamic = "force-dynamic";
export default async function Login() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect(Routes.home);
  }

  return (
    <main className="flex flex-col items-center p-20 border rounded border-zinc-200">
      <p className="pb-2 text-xl">Sign in to view your mood logs</p>
      <LoginWithGithub />
    </main>
  );
}
