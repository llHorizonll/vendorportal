import React from "react";
import { Box, Grid, Typography, TextField, FormGroup, FormControlLabel, Checkbox, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";

const CreateBu = ({ setAuthView, invitationData, setCompanyFormData }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: invitationData?.data,
  });
  const router = useRouter();
  const { inviteCode } = router.query;

  const handleViewChange = (newView) => {
    setAuthView(newView);
  };

  const onSubmit = (values) => {
    if (!inviteCode) {
      alert("not found inviteCode");
      return;
    }
    //1. update bu from company send to user page
    setCompanyFormData(values.company);
    //2. go to create_user
    handleViewChange("create_user");
  };

  return (
    <React.Fragment>
      <Typography variant="body1" gutterBottom>
        <b>Create Company</b> - Your one-stop vendor portal! Create an account to manage your quotations, orders, and
        price-list update for your clients
      </Typography>
      {!invitationData ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction={"column"} spacing={1}>
            <Grid item>
              <Controller
                name="endpoint"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    id="endpoint"
                    label="Endpoint"
                    variant="standard"
                    disabled
                    size="small"
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="company.company_name"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Company" variant="standard" disabled size="small" />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="company.address"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Address" variant="standard" disabled size="small" />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="company.district"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="District" variant="standard" disabled size="small" />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="company.county"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="County" variant="standard" disabled size="small" />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="company.province"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Province" variant="standard" disabled size="small" />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="company.email"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Email" variant="standard" disabled size="small" />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="company.tax_id"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="TAX_ID" variant="standard" disabled size="small" />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="company.branch_id"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Branch_ID" variant="standard" disabled size="small" />
                )}
              />
            </Grid>
          </Grid>

          <Grid item sx={{ marginTop: 2, marginBottom: 2 }}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="I hereby acknowledge and accept the terms and conditions outlined in the terms of service agreement."
              />
            </FormGroup>
          </Grid>

          <Grid item>
            <Button type="submit" variant="contained" fullWidth sx={{ marginBottom: 2 }}>
              Next
            </Button>
          </Grid>
        </form>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        {/* <Link
          href={"#sign_in"}
          onClick={(e) => {
            e.preventDefault();
            if (buid) {
              window.location.href = window.location.origin + window.location.pathname;
            } else {
              handleViewChange("sign_in");
            }
          }}
        >
          Already have an account? Sign in
        </Link> */}
      </Box>
    </React.Fragment>
  );
};

export default CreateBu;
