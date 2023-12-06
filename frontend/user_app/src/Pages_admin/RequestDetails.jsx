import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Model from "../components/Model";
import SideBar from "../components/SideBar_admin";
import { Button } from "@mui/material";
import AddressCheckImage from "../images/address.svg";
import IdentityCheckImage from "../images/identity.svg";
import PoliceCheckImage from "../images/police_check.jpg";
import apiCaller from "../api/apiCaller";

function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [actualAddress, setActualAddress] = useState("");
  const [requestAddress, setRequestAddress] = useState("");
  const [criminalRecord, setcriminalRecord] = useState("");
  const [type, setType] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const data = [
    {
      image: IdentityCheckImage,
      title: "Is the NIC legitimate?",
      description:
        "Is the NIC of the user a registered NIC in the Department for Registration of Persons?",
      successMessage: "NIC is legitimate",
    },
    {
      image: AddressCheckImage,
      title: "Is the Address provided legitimate?",
      description:
        "Does the address match with the registered address for the NIC?",
      successMessage: "Address is legitimate",
    },
    {
      image: PoliceCheckImage,
      title: "Can the police clearance be issued?",
      description:
        "Are there any criminal offences committed by the citizen during his lifetime?",
      successMessage: "Eligible for police clearance",
    },
  ];
  const handleOpen = (index) => {
    setActualAddress("Actual");
    setRequestAddress("Request");
    setcriminalRecord("Criminal");
    setType(index);
    setOpen(true);
  };

  //Get the parameters from the URL
  const { id } = useParams();
  console.log(id);
  const [policeDetails, setPoliceDetails] = useState([]);

  // Function to handle the issuing certificate
  const handleIssuing = async () => {
    const status = {
      new_status: "APPROVED",
    }
    try {
      const response = await apiCaller(
        `certificate/${id}/status/update`,
        "POST",
        null,
        status
      );
      console.log(response);
    } catch (error) {
      if (error.status === 404) {
        console.log("Issuing failed");
      }
    }
  }

  useEffect(() => {
    const getCertificateRequests = async () => {
      try {
        const response = await apiCaller(
          `certificate/${id}`,
          "GET",
          null,
          null
        );
        console.log(response);
        setPoliceDetails(response.data["police_check_details"]);
      } catch (error) {
        if (error.status === 404) {
          console.log("No requests found");
        }
      }
    };
    getCertificateRequests();
  }, []);
  console.log(policeDetails);

  //Convert an object to an array
  // const policeDetailsArray = Object.entries(policeDetails);

  return (
    <>
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          pl: 3,
          pr: 3,
          pt: 9,
          width: "70vw",
          height: "90vh",
          ml: "22%",
          mb: "5%",
        }}
      >
        <Grid container spacing={5}>
          {data.map((item, index) => (
            <Grid item key={index} xs={12} lg={4} pt={3} mt={3}>
              <Card>
                <div style={{ height: 180 }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 200, mx: "auto", p: 3 }}
                    height={2}
                    width={100}
                    image={item.image}
                    alt={item.title}
                  />
                </div>

                <CardContent>
                  <Typography
                    variant="h7"
                    sx={{ height: 50 }}
                    component="div"
                    mb={2}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 12, height: 50 }}
                    color="text.secondary"
                  >
                    {item.description}
                  </Typography>
                  <button
                    className={`flex items-center ${
                      policeDetails.eligibility ? "bg-[#699eee]" : "bg-red-500"
                    } text-white text-sm font-bold px-4 py-3 mt-5 rounded-lg`}
                    role="alert"
                    onClick={() => {
                      if (index === 2) {
                        handleOpen(index);
                      }
                    }}
                  >
                    <svg
                      className="fill-current w-4 h-4 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                    <Typography sx={{ fontSize: 12 }}>
                      <Typography sx={{ fontSize: 12 }}>
                        {index === 2
                          ? policeDetails.eligibility
                            ? item.successMessage
                            : "Not eligible: " + item.successMessage
                          : item.successMessage}
                      </Typography>
                    </Typography>
                  </button>
                </CardContent>
              </Card>
            </Grid>
          ))}
          <div style={{ display: "flex", width: "80%", margin: "auto" }}>
            <Button
              variant="contained"
              sx={{
                mr: 1,
                mt: 3,
                backgroundColor: "#699eee",
                ":hover": {
                  backgroundColor: "#699eee",
                },
                fontSize: {
                  xs: 12,
                  sm: 14,
                  md: 15,
                },
                width: "50%",
                textTransform: "none",
              }}
              onClick={handleIssuing}
            >
              Issue Certifcate
            </Button>

            <Button
              variant="contained"
              sx={{
                ml: 1, // Add margin to separate buttons
                mt: 3,
                backgroundColor: "black", // Customize background color
                ":hover": {
                  backgroundColor: "#ff8c00", // Customize hover background color
                },
                fontSize: {
                  xs: 12,
                  sm: 14,
                  md: 15,
                },
                width: "50%",
                textTransform: "none",
              }}
            >
              Reject issue
            </Button>
          </div>
        </Grid>
        <Model
          open={open}
          setOpen={setOpen}
          inputType={type}
          dataCriminal={policeDetails}
        />
      </Box>
    </>
  );
}

export default Dashboard;
