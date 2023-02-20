import React, { useEffect } from "react";

import styles from "../styles/Auth.module.css";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { adminAuthClient } from "../lib/supabaseServer";
import { useRouter } from "next/router";
import axios from "axios";
import { Box, Typography, TextField, FormGroup, FormControlLabel, Checkbox, Button, Link } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

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

  const createBusinessUnit = async (formData) => {
    console.log(formData);
    try {
      const { data, error, status } = await axios.post("/api/businessUnit", formData);

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

      const { data, error, status } = await supabase
        .from("users")
        .update({ business_unit_id: buId, providers: ["google"], active: true, is_admin: true })
        .eq("id", userId);
      console.log(data, error, status);
      if (error && status !== 406) {
        throw error;
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const checkUserExistById = async (id) => {
    const { data } = await axios.get(`/api/users/checkUsersAlreadyExits?id=${id}`);
    return data;
  };

  const checkUserExistByEmail = async (email) => {
    const { data } = await axios.get(`/api/users/checkUsersAlreadyExits?email=${email}`);
    return data;
  };

  const clearCookie = () => {
    document.cookie = "supabase-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "sb-refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "sb-access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const addContactForNewUser = async () => {
    let { data, error, status } = await supabase.from("invitation").select(`*`).eq("id", code).single();
    if (!data) {
      alert("not found code");
      return;
    }
    if (new Date(data.valid_till) > new Date()) {
      console.log(data?.json_info?.contact_info, "add contact");
      alert("add contact success");
      await supabase.from("invitation").update({ valid_till: new Date() }).eq("id", data.id);
      alert("update valid_till");
    } else {
      console.log("not create contact");
    }
  };

  const createCompanyAndUpdateInvitation = async (user) => {
    let authView = localStorage.getItem("authView");
    let inviteCode = localStorage.getItem("inviteCode");
    switch (authView) {
      case "sign_up_with_google":
        let formData = JSON.parse(localStorage.getItem("company"));

        if (!inviteCode) {
          return;
        }

        let userIsAlreadyExist = await checkUserExistById(user.id);
        if (userIsAlreadyExist && userIsAlreadyExist?.business_unit_id !== null) {
          clearCookie();
          alert("This email address is already in use by another account.");
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
        await updateUser(user.id, buId);
        //4. clear localStorage
        localStorage.removeItem("company");
        localStorage.removeItem("inviteCode");

        break;
      case "google_sign_in":
        //0. check user already exits
        let data = await checkUserExistByEmail(user.email);
        if (!data.business_unit_id) {
          alert("Invalid email or password combination.");
          await adminAuthClient.auth.admin.deleteUser(user.id);
          clearCookie();
          window.location.href = `${window.location.origin}`;
          return;
        }

        if (!data.providers || data?.providers.length === 0 || !data?.providers.find((i) => i === "google")) {
          alert("Invalid email or password combination.");
          await adminAuthClient.auth.admin.updateUserById(user.id, {
            app_metadata: { providers: ["email"] },
          });

          clearCookie();
          window.location.href = `${window.location.origin}`;
          return;
        }

        //1. pass user if have inviate login in first time create contact
        if (inviteCode) {
          addContactForNewUser();
        }

        break;
    }

    localStorage.removeItem("authView");
    window.location.href = `${window.location.origin}`;
  };

  useEffect(() => {
    if (user) {
      createCompanyAndUpdateInvitation(user);
    }
  }, [user]);

  return (
    <div style={btn_center}>
      <div className={styles.formContainer}>
        <Box m={2} sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      </div>
    </div>
  );
};

export default redirectPage;
