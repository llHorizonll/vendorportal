import React from "react";
import "../styles/globals.css";
import Box from "@mui/material/Box";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import Layout from "../components/Layout";
import { ThemeProvider } from "@mui/material";
import { theme } from "../utils/theme";

function App({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <ThemeProvider theme={theme}>
      <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Layout open={open} handleDrawerToggle={handleDrawerToggle}>
            <Component {...pageProps} />
          </Layout>
        </Box>
      </SessionContextProvider>
    </ThemeProvider>
  );
}

export default App;
