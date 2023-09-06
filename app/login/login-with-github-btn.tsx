"use client";
import { Button } from "@/components/ui/button";
import { Routes } from "@/routes";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function LoginWithGithub() {
  const supabase = createClientComponentClient<Database>();

  const handleSignin = async () => {
    try {
      console.log(
        "should redir to: ",
        `${location.origin}${Routes.api.authCallback}`
      );
      const data = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: { redirectTo: `${location.origin}${Routes.api.authCallback}` },
      });

      console.log("data is data", JSON.stringify(data));
    } catch (e) {
      console.log("sign in failed");
      console.error(e);
    }
  };

  return (
    <Button onClick={handleSignin}>
      <GitHubLogoIcon />
      <span className="pl-2">Sign in with Github</span>
    </Button>
  );
}
