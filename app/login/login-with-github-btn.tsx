"use client";
import { Button } from "@/components/ui/button";
import { Routes } from "@/routes";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function LoginWithGithub() {
  const supabase = createClientComponentClient<Database>();

  const handleSignin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: Routes.api.authCallback },
    });
  };

  return (
    <Button onClick={handleSignin}>
      <GitHubLogoIcon />
      <span className="pl-2">Sign in with Github</span>
    </Button>
  );
}
