import React from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Box, Typography, Link } from "@mui/material";

const EmailActivate = ({ setAuthView, inviteCode }) => {
  const handleViewChange = (newView) => {
    setAuthView(newView);
  };

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom sx={{ color: "rgba(0, 0, 0, 0.87)" }}>
        Email activaiton
      </Typography>
      <Box mb={2}>
        <Typography variant="body1" gutterBottom sx={{ marginBottom: 2 }}>
          Thank you for creating an account with BlueLedger! We have sent a confirmation email to the email address you
          provided. Please click on the link in the email to verify your email address and activate your account.
        </Typography>
        {/* <Button type="submit" variant="contained" fullWidth onClick={() => {}}>
          Resend email
        </Button> */}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Link
          href={window.location.origin + window.location.pathname + `/?inviteCode=${inviteCode}`}
          onClick={() => {
            // e.preventDefault();
            handleViewChange("sign_in");
          }}
        >
          Already have an account? Sign in
        </Link>
      </Box>
    </React.Fragment>
  );
};

export default EmailActivate;
