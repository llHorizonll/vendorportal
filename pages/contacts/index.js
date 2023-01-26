import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import FilterlistBox from "@/components/FilterlistBox";

const Contacts = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <FilterlistBox />
      <>
        <Paper
          sx={{
            p: 2,
            margin: "auto",
            flexGrow: 1,
            backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff"),
          }}
        >
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </Grid>
            <Grid item xs={12} sm container justifyContent="center" alignItems="center">
              <Grid item xs={12} sm={3} container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    John Doe
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Four Seasons Hotel Washington D.C.
                  </Typography>
                  {/* <Typography variant="body2" color="text.secondary">
                    ID: 1030114
                  </Typography> */}
                </Grid>
              </Grid>
              <Grid item xs={12} sm alignSelf="center">
                <Typography variant="subtitle1" component="div">
                  CONTACT INFO
                </Typography>
              </Grid>
              <Grid item xs={12} sm alignSelf="center">
                <Typography variant="subtitle1" component="div">
                  EMAIL
                </Typography>
              </Grid>
              <Grid item xs={12} sm alignSelf="center">
                <Typography variant="subtitle1" component="div">
                  PHONE
                </Typography>
              </Grid>
              <Grid item xs={12} sm alignSelf="center">
                <Typography variant="subtitle1" component="div">
                  ADDRESS
                </Typography>
              </Grid>
              <Grid item alignSelf="center">
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </>
    </Box>
  );
};

export default Contacts;
