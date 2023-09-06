import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  console.log("Request intercepted in auth callback");
  const requestUrl = new URL(request.url);
  console.log("Request origin", requestUrl);
  const code = requestUrl.searchParams.get("code");
  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
    console.log("response for exchange");
  }

  return NextResponse.redirect(requestUrl.origin);
}
