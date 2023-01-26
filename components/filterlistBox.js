import { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const filterlistBox = () => {
  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <Paper
      sx={{
        p: 2,
        marginBottom: 2,
        flexGrow: 1,
        backgroundColor: (theme) => (theme.palette.mode === "dark" ? "EEEEEE" : "#fff"),
      }}
    >
      <Grid container spacing={2} direction="row">
        {/* <Box
          component="form"
          sx={{
            //background: "#EEEEEE",
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        > */}
        <Grid item xs={12} sm={3}>
          <TextField label="Search" variant="standard" size="small" fullWidth />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="status-select">Status</InputLabel>
            <Select
              labelId="status-select"
              id="status-select"
              size="small"
              fullWidth
              value={status}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value={"Active"}>Active</MenuItem>
              <MenuItem value={"Inacitve"}>Inacitve</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {/* </Box> */}
      </Grid>
    </Paper>
  );
};

export default filterlistBox;
