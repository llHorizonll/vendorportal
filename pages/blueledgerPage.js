import React, { useState, useEffect } from "react";
import styles from "../styles/Auth.module.css";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import {
  Box,
  Grid,
  Typography,
  TextField,
  InputLabel,
  FormGroup,
  FormControl,
  Select,
  MenuItem,
  Button,
  Link,
} from "@mui/material";
import axios from "axios";

const btn_center = {
  margin: "0",
  position: "absolute",
  top: "50%",
  msTransform: "translateY(-50%)",
  transform: "translateY(-50%)",
};

const jsonNewInvite = {
  receiver_email: "noreplycarmen@gmail.com",
  data: {
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

const jsonAlreadyExistInvite = {
  receiver_email: "noreplycarmen@gmail.com",
  data: {
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
  const [jsonData, setJsonData] = useState(jsonNewInvite);
  const [result, setResult] = useState();
  const router = useRouter();

  const createInvitationLink = async () => {
    const { data } = await axios.post("/api/invitation", jsonData);
    setResult(data);
  };

  return (
    <div style={btn_center}>
      <div className={styles.formContainer}>
        <FormControl fullWidth size="small" sx={{ marginBottom: 2 }}>
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
                setJsonData(jsonNewInvite);
              } else {
                setJsonData(jsonAlreadyExistInvite);
              }
            }}
          >
            <MenuItem value={"newInvite"}>newInvite</MenuItem>
            <MenuItem value={"existInvite"}>existInvite</MenuItem>
          </Select>
        </FormControl>
        <div>
          <Typography style={{ color: "#000" }} variant="body2" component="pre">
            {JSON.stringify(jsonData, 0, 2)}
          </Typography>
        </div>
        <Button variant="contained" color="secondary" onClick={() => createInvitationLink()} sx={{ margin: "1rem 0" }}>
          test BL create invite link
        </Button>
        <Link
          onClick={() => {
            router.push(result);
          }}
        >
          <Typography>{result && result}</Typography>
        </Link>
      </div>
      <div id="countdown"></div>
    </div>
  );
};

export default BlueledgerPage;
