import React, { useState } from "react";
import Box from "@mui/material/Box";
import Header from "../components/header";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Select } from "@mui/material";
import Axios from "axios";
import SideNav from "../components/sideNav";
import SideBar from "../components/SideBar";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

//
import { useAuthContext } from "@asgardeo/auth-react";

const override = {
  display: "block",
  margin: "0 auto",
  marginTop: "18%",
  marginLeft: "53%",
};

function ApplyCertificate() {
  
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "white",
          p: 3,
          width: {
            sm: "70%",
            md: "70%",
            lg: "70vw",
          },
          ml: {
            xs: "0%",
            sm: "25%",
          },
          mt: "3%",
          borderRadius: 4,
          boxShadow: { xs: 0, sm: 2 },
        }}
      >
        <Grid
          container
          direction="column"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: { sm: "center" },
            width: { xs: "80%", md: "100%", lg: "100%" },
            mx: "auto",
          }}
        >
          <Grid container>
            <Typography
              variant="h4"
              component="div"
              sx={{
                mb: 5,
                mt: { xs: "5%", sm: "0%", md: "0%" },
                fontWeight: 500,
                textAlign: "center",
                fontFamily: "Poppins",
                fontSize: {
                  xs: 16,
                  sm: 20,
                  md: 20,
                  lg: 22,
                },
              }}
            >
              You can apply for your{" "}
              <span style={{ color: "#699eee" }}>Grama certificate</span> by
              filling the following information
            </Typography>
          </Grid>

          <Grid>
            <InputLabel htmlFor="username" sx={{ color: "black" }}>
              NIC or Passport ID
            </InputLabel>
            <TextField
              id="filled-helperText"
              label=""
              variant="standard"
              size="small"
              sx={{ width: { xs: "100%", sm: "50vw" }, mb: 2 }}
              InputLabelProps={{
                sx: { fontSize: { xs: 12, sm: 12 } }, // Adjust the font size as needed
              }}
              mt="1"
            />
          </Grid>

          <Grid>
            <InputLabel htmlFor="username" sx={{ color: "black" }}>
              Address
            </InputLabel>
            <TextField
              id="standard-helperText"
              label="Line 1"
              variant="standard"
              size="small"
              sx={{ width: { xs: "100%", sm: "50vw" }, mb: 1 }}
              InputLabelProps={{
                sx: { fontSize: { xs: 12, sm: 12 } }, // Adjust the font size as needed
              }}
            />
          </Grid>
          <Grid>
            <TextField
              id="standard-helperText"
              label="Line 3"
              variant="standard"
              size="small"
              sx={{ width: { xs: "100%", sm: "50vw" }, mb: 3 }}
              InputLabelProps={{
                sx: { fontSize: { xs: 12, sm: 12 } }, // Adjust the font size as needed
              }}
            />
          </Grid>

          <Grid>
            <InputLabel htmlFor="username" sx={{ color: "black" }}>
              Grama Division
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="standard-filled"
              sx={{ width: { xs: "100%", sm: "50vw" } }}
              size="small"
              variant="standard"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </Grid>

          <Grid>
            <Button
              variant="outlined"
              sx={{
                mt: 3,
                width: { xs: "100%", sm: "17.5vw" },
                fontSize: {
                  xs: 15,
                  sm: 11,
                  md: 13,
                  lg: 14,
                },
                backgroundColor: "#699eee",
                textTransform: "none",
                fontFamily: "Poppins",
                borderRadius: 20,
                color: "white",
                ":hover": {
                  borderColor: "#699eee",
                  color: "#699eee",
                },
                p: 1,
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ApplyCertificate;
