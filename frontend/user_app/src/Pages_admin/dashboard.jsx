import React, { useState } from "react";
import Box from "@mui/material/Box";
import Numbers from "../components/dashboardNumbers";
import Requests from "../components/requests_admin";
import Stack from '@mui/material/Stack'
import SideBar from "../components/SideBar_admin";

function Dashboard() {
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
          display:"flex",
          bgcolor: "background.default",
          p: 3,
          pt:11,
          width: {xs:"100%", sm:"70vw"},
          ml: {xs:"0%" , sm:"22%"},
        }}
      >
        <Stack >
          <Requests/>
        </Stack>
      </Box>
    </>
  );
}

export default Dashboard;
