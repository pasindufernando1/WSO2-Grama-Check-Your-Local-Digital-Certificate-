import React from "react";
import Box from "@mui/material/Box";
import Numbers from "../components/dashboardNumbers";
import Requests from "../components/requests";
import Stack from '@mui/material/Stack'

function dashboard() {
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display:"flex",
          bgcolor: "background.default",
          p: 3,
          width: "70vw",
          ml: "22%",
        }}
      >
        <Stack>
          <Requests/>
          <Numbers grama="Kottawa West" division="Maharagama" district="Colombo"/>
        </Stack>
      </Box>
    </>
  );
}

export default dashboard;
