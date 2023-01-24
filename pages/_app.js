import React from "react";
import "../styles/globals.css";
import Box from "@mui/material/Box";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import Navbar from "../components/Navbar";
import { ThemeProvider } from "@mui/material";
import { theme } from "../utils/theme";
import SideNav from "../components/SideNav";

function MyApp({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen((prevState) => !prevState);
  };
  return (
    // <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
    //   <Component {...pageProps} />
    // </SessionContextProvider>
    <ThemeProvider theme={theme}>
      <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Navbar handleDrawerToggle={handleDrawerToggle} />
          <SideNav open={open} handleDrawerToggle={handleDrawerToggle} />
          <Component {...pageProps} />
        </Box>
      </SessionContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
