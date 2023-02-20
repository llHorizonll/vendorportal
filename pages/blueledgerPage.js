import React, { useState, useEffect } from "react";
import styles from "../styles/Auth.module.css";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import {
  Collapse,
  Typography,
  TextField,
  InputLabel,
  FormGroup,
  FormControl,
  Select,
  MenuItem,
  Button,
  Link,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import axios from "axios";

const btn_center = {
  margin: "0",
  position: "absolute",
  top: "50%",
  msTransform: "translateY(-50%)",
  transform: "translateY(-50%)",
};

const BL1 = {
  json_info: {
    company: {
      email: "show@email.com",
      county: "Yannawa",
      tax_id: "TAXID",
      address: "test1",
      district: "Bangpongpang",
      province: "Krung Thep",
      branch_id: "0001",
      telephone: "0800000000",
      company_name: "CARMEN",
    },
    endpoint: "https://app.carmenteam.com",
    contact_info: {
      county: "Yannawa",
      tax_id: "TAXID",
      address: "test1",
      district: "Bangpongpang",
      province: "Krung Thep",
      branch_id: "BranchID",
      telephone: "0800000000",
      show_email: "show@email.com",
      company_name: "CARMEN",
      contact_email: "contact@email.com",
    },
  },
};

const BL2 = {
  json_info: {
    company: {
      email: "show@email.com",
      county: "Yannawa",
      tax_id: "TAXID",
      address: "test1",
      district: "Bangpongpang",
      province: "Krung Thep",
      branch_id: "0001",
      telephone: "0800000000",
      company_name: "CARMEN",
    },
    endpoint: "https://app.carmenteam.com",
    contact_info: {
      county: "Yannawa",
      tax_id: "TAXID",
      address: "test1",
      district: "Bangpongpang",
      province: "Krung Thep",
      branch_id: "BranchID",
      telephone: "0800000000",
      show_email: "show@email.com",
      company_name: "CARMEN",
      contact_email: "contact@email.com",
    },
  },
  business_unit_id: "5501e58e-607e-4c2c-bd67-66a497ec6322",
};

const BlueledgerPage = () => {
  const [formDataType, setFormDataType] = useState("newInvite");
  const [jsonData, setJsonData] = useState(BL1);
  const [token, setToken] = useState("");
  const [inviteData, setInviteData] = useState("");
  const [result, setResult] = useState("");
  const router = useRouter();
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const createInvitationLink = async () => {
    const res = await axios
      .post("/api/invitation", jsonData, { headers: { Authorization: `Bearer ${token}` } })
      .catch(function (error) {
        if (error.response) {
          alert(error.response.data.message);
        }
      });

    if (res) {
      setResult(res.data);
    }
  };

  const testGetInviatationById = async () => {
    const res = await axios
      .get(`/api/invitation?id=4ed6ce0e-6621-4d75-bc82-c8baa299c8db`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch(function (error) {
        console.log(error);
        if (error.response) {
          alert(error.response.data.message);
        }
      });

    if (res) {
      alert("can access invitation table");
      setInviteData(res.data);
    }
  };

  const testGetToken = async () => {
    const res = await axios.get(`/api/generateToken`).catch(function (error) {
      if (error.response) {
        alert(error.response.data.message);
      }
    });

    if (res) {
      setToken(res.data);
    }
  };

  return (
    <div style={btn_center}>
      <div className={styles.formContainer}>
        <FormControl fullWidth size="small">
          <InputLabel id="demo-simple-select-label">select example data from blueledger</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formDataType}
            label="select example data from blueledger"
            onChange={(e) => {
              let v = e.target.value;
              setFormDataType(v);
              if (v === "newInvite") {
                setJsonData(BL1);
              } else {
                setJsonData(BL2);
              }
            }}
          >
            <MenuItem value={"newInvite"}>new invite without domain *bl_id (not create contact)</MenuItem>
            <MenuItem value={"existInvite"}>exist invite have bl_id (create contact)</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="secondary" onClick={() => testGetToken()} sx={{ margin: "1rem 0" }}>
          1. testGetToken
        </Button>
        <br />
        <TextField
          label="Token"
          multiline
          maxRows={4}
          fullWidth
          value={token}
          onChange={(e) => setToken(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        <List
          sx={{ width: "100%", bgcolor: "#434656", color: "white" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          dense
        >
          <ListItemButton onClick={() => setOpen1(!open1)}>
            <ListItemText primary="post data for send request create invite link" />
            {open1 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open1} timeout="auto" unmountOnExit>
            <div>
              <Typography variant="body2" component="pre">
                {JSON.stringify(jsonData, 0, 2)}
              </Typography>
            </div>
          </Collapse>
        </List>

        <br />
        <Button variant="contained" color="secondary" onClick={() => createInvitationLink()} sx={{ margin: "1rem 0" }}>
          2. test BL create invite link
        </Button>
        <br />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => testGetInviatationById()}
          sx={{ margin: "1rem 0" }}
        >
          3. test get invitation table by id
        </Button>

        <Link
          onClick={() => {
            router.push(result);
          }}
        >
          <Typography>{result && result}</Typography>
        </Link>
        {inviteData ?? (
          <List
            sx={{ width: "100%", bgcolor: "#434656", color: "white" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            dense
          >
            <ListItemButton onClick={() => setOpen2(!open2)}>
              <ListItemText primary="invitation table by id" />
              {open2 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open2} timeout="auto" unmountOnExit>
              <div>
                <Typography variant="body2" component="pre">
                  {JSON.stringify(inviteData, 0, 2)}
                </Typography>
              </div>
            </Collapse>
          </List>
        )}
      </div>
    </div>
  );
};

export default BlueledgerPage;
