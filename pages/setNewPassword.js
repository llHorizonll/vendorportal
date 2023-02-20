import React, { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { adminAuthClient } from "../lib/supabaseServer";

import styles from "../styles/Auth.module.css";
import { Grid, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";

const btn_center = {
  margin: "0",
  position: "absolute",
  top: "50%",
  msTransform: "translateY(-50%)",
  transform: "translateY(-50%)",
};

const validationSchema = yup.object({
  name: yup.string("Enter your name").required("Password is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const SetNewPassword = () => {
  const [isLoading, setLoading] = useState(false);
  const user = useUser();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const clearCookie = async () => {
    // document.cookie = "supabase-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // document.cookie = "sb-refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // document.cookie = "sb-access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    await supabase.auth.signOut();
  };

  useEffect(() => {
    if (user) {
      console.log(user, "in, setnewpassword logout");
      if (!user.app_metadata?.active) {
        localStorage.setItem("user", JSON.stringify(user));
        clearCookie();
      }
    }
  }, [user]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      password: "",
      cfpassword: "",
    },
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values) => {
    let user = JSON.parse(localStorage.getItem("user"));
    let userId = user.id;
    let email = user.email;
    //update table user
    await supabase
      .from("users")
      .update({ name: values.name, providers: ["email"], active: true })
      .eq("id", userId);

    //update table authen
    await adminAuthClient.auth.admin.updateUserById(userId, {
      password: values.password,
      app_metadata: { active: true },
    });

    //login
    try {
      const { data, error, status } = await supabase.auth.signInWithPassword({
        email: email,
        password: values.password,
      });

      if (data) {
        localStorage.removeItem("user");
        router.push("/");
      }

      if (error && status !== 406) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  return (
    <div style={btn_center}>
      <div className={styles.formContainer}>
        <Typography variant="h4" gutterBottom sx={{ color: "rgba(0, 0, 0, 0.87)" }}>
          Update new account
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction={"column"} spacing={2}>
            <Grid item>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Name *"
                    variant="standard"
                    size="small"
                    error={errors.name?.message && Boolean(errors.name?.message)}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Password *"
                    variant="standard"
                    type="password"
                    size="small"
                    error={errors.password?.message && Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="cfpassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Confirm Password *"
                    variant="standard"
                    type="password"
                    size="small"
                    error={errors.cfpassword?.message && Boolean(errors.cfpassword?.message)}
                    helperText={errors.cfpassword?.message}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <LoadingButton type="submit" loading={isLoading} variant="contained" fullWidth sx={{ marginBottom: 1 }}>
                <span>Set new password</span>
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default SetNewPassword;
