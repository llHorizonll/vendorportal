import { useSession } from "@supabase/auth-helpers-react";
import React from "react";
import Dashboard from "./dashboard";
import Auth from "./authSupabaseTheme";

const Home = () => {
  const session = useSession();

  return <React.Fragment>{!session ? <Auth /> : <Dashboard />}</React.Fragment>;
};

export default Home;
