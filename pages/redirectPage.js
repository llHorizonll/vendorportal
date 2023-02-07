import React, { useEffect } from "react";
import styles from "../styles/Auth.module.css";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import axios from "axios";
import { Box, Typography, TextField, FormGroup, FormControlLabel, Checkbox, Button, Link } from "@mui/material";

const btn_center = {
  margin: "0",
  position: "absolute",
  top: "50%",
  msTransform: "translateY(-50%)",
  transform: "translateY(-50%)",
};

const redirectPage = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  const createBusinessUnit = async (formData) => {
    try {
      let postData = {
        ...formData,
        business_name: formData.company_name,
      };
      delete postData.telephone;
      delete postData.company_name;

      const { data, error, status } = await axios.post("/api/businessUnit", postData);

      console.log(`waiting for update vendor in Blueledger`);

      if (error && status !== 406) {
        throw error;
      }
      //setBuId(data);
      return data;
    } catch (error) {
      alert("Can't create business_unit");
      console.log(error);
    } finally {
      console.group("%c #1", "color: white; background-color: red");
      console.log("create bu");
      console.log("waiting for update vendor API in Blueledger");
      console.groupEnd();
      console.group("%c #2", "color: white; background-color: red");
      console.log("update vendor API in Blueledger");
      console.groupEnd();
      console.group("%c #3", "color: white; background-color: red");
      console.log("go to create user");
      console.groupEnd();
    }
  };

  const updateInvitation = async (inviteCode, buId) => {
    try {
      if (!buId) {
        alert("not found buId");
        return;
      }

      const { data, error, status } = await supabase
        .from("invitation")
        .update({ business_unit_id: buId })
        .eq("id", inviteCode);
      console.log(`waiting for update vendor in Blueledger`);

      if (error && status !== 406) {
        throw error;
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const updateUser = async (userId, buId) => {
    try {
      if (!buId) {
        alert("not found buId");
        return;
      }

      const { data, error, status } = await supabase.from("users").update({ business_unit_id: buId }).eq("id", userId);
      console.log(data, error, status);
      if (error && status !== 406) {
        throw error;
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const createCompanyAndUpdateInvitation = async (userId) => {
    let formData = JSON.parse(localStorage.getItem("company"));
    let inviteCode = localStorage.getItem("inviteCode");

    if (!inviteCode) {
      return;
    }

    let userIsAlreadyExist = await checkUserExist(inviteCode, userId);
    console.log(userIsAlreadyExist);
    if (userIsAlreadyExist) {
      document.cookie = "supabase-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "sb-refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "sb-access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      alert("this gmail already exists");
      window.location.href = `${window.location.origin}/?inviteCode=${inviteCode}`;
      return;
    }
    //1. create bu
    let buId = await createBusinessUnit(formData);
    if (!buId) {
      return;
    }
    //2. update bu in invitation_table
    await updateInvitation(inviteCode, buId);
    //3. update bu in user
    await updateUser(userId, buId);
    //4. clear localStorage
    localStorage.removeItem("company");
    localStorage.removeItem("inviteCode");
  };

  const checkUserExist = async (inviteCode, userId) => {
    const { data, error, status } = await supabase.from("users").select("id").eq("id", userId).single();
    return data;
  };

  useEffect(() => {
    if (user) {
      createCompanyAndUpdateInvitation(user.id);
    }
  }, [user]);

  return (
    <div style={btn_center}>
      <div className={styles.formContainer}>
        <React.Fragment>
          <Typography variant="h4" gutterBottom sx={{ color: "rgba(0, 0, 0, 0.87)" }}>
            Redirect
          </Typography>
          <Box mb={2}>
            <Typography variant="body1" gutterBottom sx={{ marginBottom: 2 }}>
              Thank you for creating an account with BlueLedger!
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
              onClick={(e) => {
                // e.preventDefault();
                router.push("/");
              }}
            >
              {`--> go to dashboard`}
            </Link>
          </Box>
        </React.Fragment>
      </div>
    </div>
  );
};

export default redirectPage;
