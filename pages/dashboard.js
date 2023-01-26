import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Dashboard = () => {
  const supabase = useSupabaseClient();
  const user = useUser();

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <>
        <h2>Email : {user?.email}</h2>
        <button className="button block" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </>
    </Box>
  );
};

export default Dashboard;
