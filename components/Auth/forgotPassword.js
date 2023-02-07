import React from "react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Box, Typography, TextField, FormGroup, FormControlLabel, Checkbox, Button, Link } from "@mui/material";

const ForgotPassword = ({ setAuthView }) => {
  const supabase = useSupabaseClient();

  const handleViewChange = (newView) => {
    setAuthView(newView);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom sx={{ color: "rgba(0, 0, 0, 0.87)" }}>
        Forgot Password
      </Typography>
      <Typography variant="body1" gutterBottom>
        We understand that forgetting a password can be frustrating. We are here to help you reset your account and get
        back on track as quickly as possible. Please enter the email address associated with your account, and we will
        send you instructions for resetting your password. Thank you for using our software!
      </Typography>
      <Box mb={2}>
        <TextField id="email" label="Email" variant="standard" fullWidth sx={{ marginBottom: 2 }} />
        <Button variant="contained" fullWidth>
          SEND MAIL
        </Button>
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
          href={"#sign_in"}
          onClick={(e) => {
            e.preventDefault();
            handleViewChange("sign_in");
          }}
        >
          Already have an account? Sign in
        </Link>
      </Box>
    </React.Fragment>
  );
};

export default ForgotPassword;
