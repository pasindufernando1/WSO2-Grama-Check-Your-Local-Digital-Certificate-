import React, { useState } from "react";
import Box from "@mui/material/Box";
import SideBar from "../components/SideBar_admin";
import Toolbar from "@mui/material/Toolbar";
import Table from "../components/reqTable";

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
          pt:6,
          flexGrow: 1,
          bgcolor: "background.default",
          pl: 3,
          pr: 3,
          width: "70vw",
          height: "90vh",
          ml: "22%",
        }}
      >
        <Toolbar />
        <Table />
      </Box>
    </>
  );
}

export default Dashboard;
