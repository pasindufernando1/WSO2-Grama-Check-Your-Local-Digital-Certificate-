import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Header from "../components/header";
import processingImage from "../images/processing.svg";
import resubmitImage from "../images/resubmit.svg";
import completedImage from "../images/completed.svg";
import noneImage from "../images/none.svg";
import Link from '@mui/material/Link';

import { Button } from "@mui/material";

const override = {
  display: "block",
  margin: "0 auto",
  marginTop: "18%",
  marginLeft: "53%",
};

function CheckStatus() {
  const arr = [
    ["No ", "requests", noneImage],
    ["Your request is ", "processing", processingImage],
    ["Your request is ", "completed", completedImage],
    [
      "Address proof rejected due to unclearness of the image or invalid address. Resubmit address proof ",
      "required",
      resubmitImage,
    ],
  ];

  const [textIndex, setTextIndex] = useState(1);
  const [spinnerLoading, setSpinnerLloading] = useState(true);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const [mode, setMode] = useState(-1);
  const [nic, setNIC] = useState(0);

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
          bgcolor: "background.default",
          ml: { sm: "22%" },
          boxShadow: 2,
          p: 3,
          m: 4,
          pb: 7,
          borderRadius: { xs: 0, sm: 2 },
        }}
      >
        <Grid container sx={{ mt: 4 }}>
          <Grid
            xs={12}
            sm={4}
            sx={{
              mx: "auto",
              mt: { sm: "0%" },
              mr: "4%",
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <img
              src={arr[textIndex][2]}
              style={{
                maxWidth: { xs: "80%", sm: "100%" },
                width: { xs: "80%", sm: "100%" },
                margin: { xs: "auto" },
              }}
            />
          </Grid>

          <Grid
            container
            xs={12}
            sm={6}
            sx={{
              mt: { xs: "10%", sm: "0%" },
            }}
          >
            <Grid container xs={12}>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  mt: 3,
                  mx: { xs: "auto", sm: "0%" },
                  fontWeight: 700,
                  fontFamily: "Poppins",
                  textAlign: { xs: "center", sm: "left" },
                  fontSize: {
                    xs: 18,
                    sm: 18,
                    lg: 20,
                    xl: 22,
                  },
                }}
              >
                Status
              </Typography>
            </Grid>

            <Grid container xs={12}>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  ml: { xs: "0%", sm: "0%" },
                  mx: { xs: "auto" },
                  fontWeight: 700,
                  fontFamily: "Poppins",
                  fontSize: {
                    xs: 18,
                    sm: 34,
                  },
                  mt: 1,
                  mb: { xs: 2 },
                  backgroundColor: "#699eee",
                  p: 1,
                  width: "60%",
                  textAlign: "center",
                  color: "white",
                  borderRadius: 2,
                }}
              >
                Processing
              </Typography>
            </Grid>
            <Grid container xs={12}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  mt: 2,
                  color: "black",
                  fontFamily: "Poppins",
                  textAlign: { xs: "center", sm: "left" },
                  fontSize: {
                    xs: 11,
                    sm: 13,
                    md: 14,
                  },
                }}
              >
                Cerificate Request Details
              </Typography>
            </Grid>
            <Typography
              variant="h6"
              component="div"
              sx={{
                mt: 1,
                color: "#7a7979",
                fontFamily: "Poppins",
                textAlign: { sm: "left" },
                fontSize: {
                  xs: 11,
                  sm: 13,
                  md: 14,
                },
              }}
            >
              NIC : 200079504080 <br />
              Address : 38 B , Wewala , Horana <br />
              Requested Date : 24/10/2023
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
            <Typography
              variant="h4"
              component="div"
              sx={{
                fontWeight: 400,
                textAlign: "left",
                fontFamily: "Poppins",
                fontSize: {
                  xs: 12,
                  sm: 13,
                  md: 13,
                  lg: 13,
                },
                width : {sm:"80%"},
                mx:{sm:"auto"},
                mt : 5, 
              }}
            >
              If you need help with the processing or need further clarification with the request processing please use the <Link href="#" sx={{ textDecoration: 'underline' }}>
        help desk
      </Link>. 
            </Typography>
          </Grid>
      </Box>
    </>
  );
}

export default CheckStatus;
