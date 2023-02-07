import React, { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  Divider,
} from "@mui/material";
import { GoogleIcon } from "../../utils/svgIcon";
import { useRouter } from "next/router";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = yup.object({
  name: yup.string("Enter your name").required("Password is required"),
  email: yup.string("Enter your email").email("Enter a valid email").required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  cfpassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
});

const CreateUser = ({ setAuthView, companyFormData }) => {
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { inviteCode } = router.query;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const handleViewChange = (newView) => {
    setAuthView(newView);
  };

  const createBusinessUnit = async (formData) => {
    try {
      setLoading(true);

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
      setLoading(false);
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

  const createUser = async (formData, buId) => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: "https://vendorportal.vercel.app/",
          data: {
            name: formData.name,
            business_unit_id: buId,
          },
        },
      });

      if (error && status !== 406) {
        throw error;
      }

      // const formEmail = {
      //   recipient: "",
      //   recipientName: "",
      //   buId: "",
      // };

      //await axios.post("/api/sendEmailToOwner", formEmail);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const createUserWithOauth = async (formData) => {
    try {
      const { data, error } = await supabase.auth
        .signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: "http://localhost:3000/redirectPage",
          },
        })
        .then(async () => {
          let postData = {
            ...formData,
            business_name: formData.company_name,
          };
          delete postData.telephone;
          delete postData.company_name;

          localStorage.setItem("company", JSON.stringify(postData));
          localStorage.setItem("inviteCode", inviteCode);
        });
      //handleViewChange("email_activate");
      console.log(data, "data after register google");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateInvitation = async (inviteCode, buId) => {
    try {
      if (!buId) {
        alert("not found buId");
        return;
      }

      setLoading(true);
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
      setLoading(false);
    }
  };

  const onSubmit = async (values) => {
    console.log(values, "submit");
    //1. create bu
    let buId = await createBusinessUnit(companyFormData);
    if (buId) {
      return;
    }
    //2. create user
    await createUser(values, buId);
    //3. update bu in invitation_table
    await updateInvitation(inviteCode, buId);
    //4. go to activate_page
    handleViewChange("email_activate");
  };

  return (
    <React.Fragment>
      <Typography variant="body1" gutterBottom>
        <b>Create User</b> - Your one-stop vendor portal! Create an account to manage your quotations, orders, and
        price-list update for your clients
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
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email *"
                  variant="standard"
                  size="small"
                  error={errors.email?.message && Boolean(errors.email?.message)}
                  helperText={errors.email?.message}
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
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="I hereby acknowledge and accept the terms and conditions outlined in the terms of service agreement."
              />
            </FormGroup>
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" fullWidth sx={{ marginBottom: 1 }}>
              Create Account
            </Button>
          </Grid>
        </Grid>
      </form>

      <Divider sx={{ marginBottom: 1 }}>
        <Typography sx={{ color: "rgba(0, 0, 0, 0.4)" }}>or</Typography>
      </Divider>
      <Button
        fullWidth
        variant="outlined"
        startIcon={<GoogleIcon />}
        onClick={() => createUserWithOauth(companyFormData)}
        sx={{ marginBottom: 2 }}
      >
        Sign up with Google
      </Button>

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
            // if (buId) {
            //   window.location.href = window.location.origin + window.location.pathname;
            // } else {
            //   handleViewChange("sign_in");
            // }
            handleViewChange("sign_in");
          }}
        >
          Already have an account? Sign in
        </Link>
      </Box>
    </React.Fragment>
  );
};

export default CreateUser;
