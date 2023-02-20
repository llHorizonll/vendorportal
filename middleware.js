import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();

  const supabase = createMiddlewareSupabaseClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return res;
}

// import { NextRequest, NextResponse } from "next/server";

// export const middleware = async (request) => {
//   if (request.nextUrl.pathname.startsWith("/profile")) {
//     const authCookie = request.cookies.get("supabase-auth-token");
//     if (!authCookie) return NextResponse.redirect(new URL("/", request.url));
//   }
// };
