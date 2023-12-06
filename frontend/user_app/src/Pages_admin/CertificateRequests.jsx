import React, { useState } from "react";
import Box from "@mui/material/Box";
import SideBar from "../components/SideBar_admin";
import Toolbar from "@mui/material/Toolbar";
import Table from "../components/reqTable";
import { useAuthContext } from "@asgardeo/auth-react";
import apiCaller from "../api/apiCaller";
import { useEffect } from "react";

function Dashboard() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
    };

    const {state , getBasicUserInfo} = useAuthContext();

    const [basicInfo, setBasicInfo] = useState({});

    const {requests, setRequests} = useState({});
    
    useEffect(() => {
      getBasicUserInfo().then((info) => {
        console.log("Information");
        console.log(info);
        // // setBasicInfo(info);
        // console.log("Basic Info");
        // console.log(basicInfo);
        // console.log("Grama Division");
        // console.log(basicInfo.gramaDivision);

        const params = {
          grama_division_id : info.gramaDivision
        }
        console.log(params);
        const getCertificateRequests = async () => {
          try {
            const response = await apiCaller('certificates', 'GET', null, params);
            console.log(response);
            setRequests(response.data);
          }
          catch (error) {
            if (error.status === 404) {
              console.log("No requests found");
            }
          }
          
        }
        getCertificateRequests();
      });
      console.log("Requests");
      console.log(requests);
      
    }, []);


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
