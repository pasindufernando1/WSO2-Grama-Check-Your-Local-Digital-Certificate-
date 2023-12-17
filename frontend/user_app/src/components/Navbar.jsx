import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import { useAuthContext } from "@asgardeo/auth-react";

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function HideAppBar(props) {
  const {signIn} = useAuthContext();
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          sx={{
            backgroundColor: "#f3fbfb",
            color: "#2f374e",
            boxShadow: "none",
          }}
        >
          <Toolbar>
            <Container maxWidth="xl">
              <Grid container spacing={2}>
                <Grid container xs={10}>
                  <Grid xs={11}>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        fontWeight: 700, // Set to 700 for bold
                        color: "#000", // Set to '#000' for black
                        textAlign: "Left",
                        mt: {
                          xs: 3,
                          sm: 2,
                          md: 1,
                          lg: 2.5,
                          xl: 2.5,
                        },
                        ml: {
                          xs: 4,
                          sm: 2,
                          md: -2,
                          lg: -2,
                          xl: -6,
                        },
                        fontFamily: "Poppins",
                        fontSize: {
                          xs: 16,
                          sm: 20,
                          md: 24,
                        },
                        mr: {
                          xs: 0,
                          sm: 18,
                          md: 30,
                        },
                        pl: {
                          xs: "0%",
                          sm: "5%",
                        },
                      }}
                    >
                      GramCert
                    </Typography>
                  </Grid>
                </Grid>
                <Grid xs={2}>
                  <Button
                    variant="contained"
                    sx={{
                      pl: {
                        xs: "10%",
                        sm: "0%",
                      },
                      pr: {
                        xs: "0%",
                        sm: "0%",
                      },
                      mt: {
                        xs: 1.5,
                        sm: 1,
                        md: 1,
                        lg: 2.5,
                        xl: 2.5,
                      },
                      fontSize: {
                        xs: 14,
                      },
                      mr: {
                        xs: 0,
                        sm: 18,
                        md: 30,
                      },
                      backgroundColor: "black",
                      ":hover": {
                        backgroundColor: "black",
                      },
                      width: {
                        xs: "100%",
                        sm: "130%",
                        md: "75%",
                        lg: "60%",
                        xl: "50%",
                      },
                      textTransform: "none",
                      float: { sm: "left", xs: "right" },
                    }}
                    onClick={() => signIn()}
                  >
                    Sign in
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  );
}
