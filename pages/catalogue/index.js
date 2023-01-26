import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import FilterlistBox from "@/components/filterlistBox";

const Catalogue = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <FilterlistBox />
      <>
        <h2>Catalogue</h2>
      </>
    </Box>
  );
};

export default Catalogue;
