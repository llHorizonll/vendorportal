import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Button, Divider } from "@mui/material";

const Dashboard = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  console.log(user, "in dashboard");

  const LinkMultipleProvider = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <>
        <h2>Email : {user?.email}</h2>
        <button className="button block" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
        <Divider />
        <Button onClick={LinkMultipleProvider}> test link google provider</Button>
      </>
    </Box>
  );
};

export default Dashboard;
