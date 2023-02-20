import { useState } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { adminAuthClient } from "../lib/supabaseServer";

import Toolbar from "@mui/material/Toolbar";
import { Box, TextField, Button, Checkbox, Divider, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import LoadingButton from "@mui/lab/LoadingButton";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Dashboard = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [isLoading, setLoading] = useState(false);
  const [linked, setLinked] = useState(false);
  //const [linked, setLinked] = useState(user?.app_metadata?.providers.find((i) => i === "google") ? true : false);
  const [newEmail, setNewEmail] = useState("");

  const LinkMultipleProvider = async (userId) => {
    setLinked(!linked);
    await supabase.auth
      .signInWithOAuth({
        provider: "google",
      })
      .then(async () => {
        await supabase
          .from("users")
          .update({ providers: ["email", "google"] })
          .eq("id", userId);
      });
  };

  const UnLinkMultipleProvider = async (userId) => {
    MySwal.fire({
      title:
        "การยกเลิกการเชื่อมต่อกับ google ระบบจะลบ session และนำท่านเข้าสู่หน้า login อีกครั้ง คุณต้องการดำเนินการต่อใช่หรือไม่?",
      showCancelButton: true,
      confirmButtonText: "OK",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLinked(!linked);
        await supabase
          .from("users")
          .update({ providers: ["email"] })
          .eq("id", userId);
        await adminAuthClient.auth.admin
          .updateUserById(userId, {
            app_metadata: { providers: ["email"] },
          })
          .then(async () => {
            await supabase.auth.signOut();
          });
      }
    });
  };

  const sendInviteCreateUser = async (email) => {
    setLoading(true);
    if (email) {
      const { data } = await supabase.from("users").select("business_unit_id").eq("id", user.id).single();
      await adminAuthClient.auth.admin.inviteUserByEmail(email, {
        redirectTo: "http://localhost:3000/setNewPassword",
        data: {
          business_unit_id: data.business_unit_id,
          active: false,
          is_admin: false,
        },
      });
      alert("email sent");
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, background: "rgb(243, 244, 249)", minHeight: "929px" }}>
      <Toolbar />
      <>
        <Typography variant="h6" sx={{ color: "rgba(0, 0, 0, 0.87)" }}>
          Email : {user?.email}
        </Typography>
        <Divider />
        <FormControlLabel
          control={
            <Checkbox
              checked={linked}
              onChange={(e) => {
                if (!e.target.checked) {
                  UnLinkMultipleProvider(user.id);
                } else {
                  LinkMultipleProvider(user.id);
                }
              }}
              name="linked"
            />
          }
          label={<span>Link google provider</span>}
        />
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Email"
            variant="outlined"
            size="small"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <LoadingButton
            loading={isLoading}
            variant="contained"
            onClick={() => sendInviteCreateUser(newEmail)}
            fullWidth
            sx={{ marginBottom: 1 }}
          >
            <span>Send invite</span>
          </LoadingButton>
        </Box>
      </>
    </Box>
  );
};

export default Dashboard;
