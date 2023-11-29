import React, { useState } from "react";
import Box from "@mui/material/Box";
import Header from "../components/header";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Axios from "axios";
import SideNav from "../components/sideNav"

function Help() {

  return (
    <>
     <SideNav/>
      <Header name={"Help"} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          width: "70vw",
          ml: "22%",
          mt: "5%",
        }}
      >
        <Grid
          container
          direction="column"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            // width: "100%",
            width: { xs: "100%", md: "100%", lg: "100%" },
            ml: { xs: "5%", md: "0%" },
          }}
        >
          <Grid container>
            <Typography
              variant="h4"
              component="div"
              sx={{
                mb: { xs: "20%", sm: "15%", md: "10%", lg: "5%" },
                mt: { xs: "15%", sm: "0%", md: "0%" },
                ml: { xs: "10%", md: "0%" },

                fontWeight: 700,
                fontFamily: "Segoe UI",
                fontSize: {
                  xs: 13,
                  sm: 20,
                  md: 30,
                  lg: 34,
                },
              }}
            >
              How can we <span style={{ color: "#09ad58" }}> help</span> you
              with?
            </Typography>
          </Grid>

          <Grid>
            <TextField
              id="outlined-basic"
              label="Type your issue"
              variant="outlined"
              size="small"
              multiline
              rows={5}
              sx={{ width: { xs: "57vw", sm: "50vw" }, mb: 3 }}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Button
            variant="outlined"
            sx={{
              ml: { xs: "15%", sm: "14.5%" },
              mt: 1,
              width: "12vw",
              borderColor: "#09ad58",
              color: "#09ad58",
              ":hover": {
                borderColor: "#09914b",
                color: "#09ad58",
              },
              fontSize: {
                xs: 9,
                sm: 11,
                md: 10,
                lg: 12,
              },
            }}
          >
            Submit
          </Button>
        </Grid>
      </Box>
    </>
  );
}

export default Help;
