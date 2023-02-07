import React from "react";
import Dashboard from "./dashboard";
import RedirectPage from "./redirectPage";
import Auth from "./authSupabaseTheme";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

const Home = () => {
  const session = useSession();
  const router = useRouter();
  const { inviteCode } = router.query;

  if (router.pathname === "/redirectPage") {
    return <RedirectPage />;
  }
  return <React.Fragment>{!session ? <Auth inviteCode={inviteCode} /> : <Dashboard />}</React.Fragment>;
};

export default Home;
