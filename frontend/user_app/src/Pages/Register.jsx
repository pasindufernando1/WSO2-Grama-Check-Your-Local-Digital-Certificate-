import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Route, Routes, useNavigate } from "react-router-dom";
//components
import Nabar from "../components/Navbar";
//image
import homeImage from "../images/landing.png";

import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from "react";

function Register() {
  const {
    state,
    signIn,
    signOut,
    getAccessToken,
    getIDToken,
    getBasicUserInfo,
  } = useAuthContext();
  // console.log(state);
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [redirectLink, setRedirectLink] = useState("/Dashboard");

  useEffect(() => {
    if (!state.isAuthenticated) {
      setIsLoading(false); // Set loading state to false after fetching user info
      return;
    }

    getBasicUserInfo().then((info) => {
      console.log(info);
      if(info.groups === undefined){ //there is no groups attribute in the token
        navigate("/Dashboard");
        return;
      }

      if(info.groups[0] === "Grama-PSSR"){
        navigate("/admin/dashboard");
      } else {
        navigate("/Dashboard");
      }
      setIsLoading(false); // Set loading state to false after fetching user info
    });
  }, []);
  return (
    <div
      style={{
        backgroundColor: "#f3fbfb",
        maxHeight: "100vh",
        minHeight: "100vh",
      }}
    >
      {
        isLoading ? (
          <>
          </>
        )
        :
        (
          !state.isAuthenticated ? (
            <div>
              <Nabar />
              <Container maxWidth="xl">
                <Box
                  sx={{
                    mt: {
                      xs: 0,
                      sm: 8,
                      md: 6,
                      lg: 0,
                    },
                  }}
                >
                  <Grid
                    container
                    sx={{ flexDirection: { xs: "column", sm: "row" } }}
                  >
                    <Grid
                      xs={12}
                      sm={7}
                      sx={{
                        alignContent: "Left",
                        alignItems: "Left",
                        display: "flex",
                        pr: 5,
                        pl: 6,
                      }}
                    >
                      <div style={{ marginTop: "20%" }}>
                        <Typography
                          variant="h3"
                          component="div"
                          sx={{
                            fontWeight: 700,
                            fontFamily: "Poppins",
                            textAlign: { xs: "center", sm: "left" },
                            fontSize: {
                              xs: 30,
                              sm: 42,
                              md: 48,
                            },
                          }}
                        >
                          Get Your{" "}
                          <span style={{ color: "#699eee" }}>
                            Grama Certificates{" "}
                          </span>
                          Without Any Hassle.
                        </Typography>
    
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{
                            mt: 2,
                            color: "#7a7979",
                            fontFamily: "Poppins",
                            textAlign: { xs: "center", sm: "left" },
                            fontSize: {
                              xs: 13,
                              sm: 16,
                              md: 20,
                            },
                          }}
                        >
                          Get your police clearance certificate in a few days in the
                          comfort of your own home!
                        </Typography>
    
                        <div
                          style={{
                            sm: {
                              textAlign: "left",
                            },
                            xs: {
                              textAlign: "center",
                              display:"flex",
                              justifyContent:"center"
                            },}}
                        >
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
                              textTransform: "none",
                            }}
                            onClick={() => signIn()}
                          >
                            Get Started
                          </Button>
                        </div>
                      </div>
                    </Grid>
    
                    <Grid
                      xs={12}
                      sm={5}
                      sx={{
                        marginTop: "8%",
                        pr: { xs: 0, sm: 5 },
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "center",
                        alignItems: "flex-end",
                      }}
                    >
                      <img src={homeImage} style={{ width: "100%" }} />
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            </div>
          ) : (
            navigate(redirectLink)
          )
        )
      }
    </div>
  );
}

export default Register;
