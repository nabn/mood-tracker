import { Routes } from "@/routes";
import type { SupabaseClient } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export function LoginWithGithub({ client }: { client: SupabaseClient }) {
  const handleSignin = async () => {
    await client.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: Routes.authCallback },
    });
  };

  return (
    <Button onClick={handleSignin}>
      <GitHubLogoIcon />
      <span className="pl-2">Sign in with Github</span>
    </Button>
  );
}
