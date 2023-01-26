import React from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

const PriceListDetail = () => {
  const router = useRouter();
  const pathData = router.query;

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <>
        <h2>PriceList</h2>
        <div>PriceList-Detail : {JSON.stringify(pathData)}</div>
      </>
    </Box>
  );
};

export default PriceListDetail;
