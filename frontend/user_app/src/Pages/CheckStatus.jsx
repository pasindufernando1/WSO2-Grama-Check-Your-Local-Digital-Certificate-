import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import processingImage from "../images/processing.svg";
import completedImage from "../images/completed.svg";
import noneImage from "../images/none.svg";
import rejectedImage from "../images/rejected.svg";
import { Link } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";
import apiCaller from "../api/apiCaller";

const override = {
  display: "block",
  margin: "0 auto",
  marginTop: "18%",
  marginLeft: "53%",
};

function CheckStatus() {
  const arr = [
    ["No Requests", noneImage],
    ["Pending", processingImage],
    ["Approved", completedImage],
    ["Rejected", rejectedImage],
    ["Collected", completedImage]
  ];

  const [textIndex, setTextIndex] = useState(2);

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const [currentRequest, setCurrentRequest] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const { state, getBasicUserInfo } = useAuthContext();

  useEffect(() => {
    const getLatestCertificateRequest = async () => {
      try {
        const response = await apiCaller(`certificate/${state.sub}/current`, 'GET');

        console.log(response);

        if (response.status === 200) { //got a current request
          console.log(response.data);
          setCurrentRequest(response.data);

          if (response.data.status === "PENDING") {
            setTextIndex(1);
          }
          else if (response.data.status === "APPROVED") {
            setTextIndex(2);
          }
          else if (response.data.status === "REJECTED") {
            setTextIndex(3);
          }
          else if (response.data.status === "COLLECTED") {
            setTextIndex(4);
          }

        }
      }
      catch (error) {
        if (error.response.status === 404) {
          setTextIndex(0);
        }
      }
      setIsLoading(false);
    }
    getLatestCertificateRequest();
  }
    , [state]);

  return (
    <>
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="pt-8">
        <Box
          component="main"
          sx={{
            m: 4,
            mt: 8,
            flexGrow: 1,
            bgcolor: "background.default",
            ml: { sm: "22%" },
            boxShadow: 2,
            p: 3,
            pb: 7,
            borderRadius: { xs: 0, sm: 2 },
          }}
        >
          {
            isLoading ? (
              <>
              </>
            )
              :
              (
                <>
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
                        src={arr[textIndex][1]}
                        style={{
                          maxWidth: "80%",
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
                            backgroundColor:
                              textIndex == 0
                                ? "#aaaaaa"
                                : textIndex == 1
                                  ? "#699eee"
                                  : textIndex == 2
                                    ? "#85cf51"
                                    : "#f4768a",
                            p: 1,
                            width: "60%",
                            textAlign: "center",
                            color: "white",
                            borderRadius: 2,
                          }}
                        >
                          {arr[textIndex][0]}
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
                          Certificate Request Details
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
                        NIC : {currentRequest ? currentRequest.nic : "Not Requested"} <br />
                        Address : {currentRequest ? currentRequest?.line_01 + ", " + currentRequest?.line_02 + ", " + currentRequest.line_03 + ", " + currentRequest?.city : "Not Requested"} <br />
                        Issued Date : {currentRequest ? currentRequest?.status === 'PENDING'  ? 'Not yet issued' : currentRequest?.issued_date.day + "/" + currentRequest?.issued_date.month + "/"  + currentRequest?.issued_date.year  : "Not Requested"} <br />
                        Collected Date : {currentRequest ? currentRequest?.status === 'PENDING' || currentRequest?.status === 'APPROVED' ? 'Not yet collected' : currentRequest?.collected_date.day + "/" + currentRequest?.collected_date.month + "/"  + currentRequest?.collected_date.year : "Not Requested"} <br />
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
                        width: { sm: "80%" },
                        mx: { sm: "auto" },
                        mt: 5,
                      }}
                    >
                      If you need help with the processing or need further clarification
                      with the request processing please use the{" "}
                      <Link to="/help">
                        Help Desk
                      </Link>
                      .
                    </Typography>
                  </Grid>
                </>
              )
          }
        </Box>
      </div>
    </>
  );
}

export default CheckStatus;
