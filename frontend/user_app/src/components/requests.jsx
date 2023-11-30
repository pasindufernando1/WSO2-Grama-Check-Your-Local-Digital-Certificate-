import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Check from "../images/Check.svg";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorIcon from "@mui/icons-material/Error";
import FunctionsIcon from "@mui/icons-material/Functions";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const DataCard = ( {data , description} ) => (
  <Card sx={{ p: 2, mt: 1, backgroundColor: "#699eee", width: "85%" ,height:"30%"}}>
    <Grid container>
      <Grid xs={10}>
        <Typography
          variant="subtitle9"
          sx={{
            fontWeight: 400,
            fontFamily: "Poppins",
            color: "#fff",
          }}
        >
          {data}
        </Typography>
      </Grid>
      <Grid mt={1}>
        <Typography
          variant="h7"
          sx={{
            color: "#fff",
          }}
        >
           {description}
        </Typography>
      </Grid>
    </Grid>
  </Card>
);
function requests() {
  return (
    <Grid
      container
      sx={{
        width: { xs: "100%", sm: "70vw" },
        marginRight: "auto",
        marginLeft: "auto",
      }}
      justifyContent="center"
    >
      <Grid xs={12} sm={6} >
        <Card sx={{ p: 4, backgroundColor: "#f9f9f9" }}>
          <Stack
            direction="column"
            justifyContent="space-around"
            alignItems="center"
            spacing={2}
          >
            <img src={Check} width="90%" style={{ marginTop: 2 }} />
            <Button
              variant="outlined"
              sx={{
                mt: 3,
                width: { xs: "100%", sm: "17.5vw" },
                fontSize: {
                  xs: 15,
                  sm: 11,
                  md: 13,
                  lg: 14,
                },
                backgroundColor: "#699eee",
                textTransform: "none",
                fontFamily: "Poppins",
                borderRadius: 2,
                color: "white",
                ":hover": {
                  borderColor: "#699eee",
                  color: "#699eee",
                },
                p: 1,
              }}
            >
              Apply for Certificate
            </Button>
          </Stack>
        </Card>
      </Grid>
      <Grid container xs={12} sm={6} 
      sx={{
          mx: "auto",
        }}>
        <DataCard data="Status of Requested Certificate" description="Pending"/>
        <DataCard data="Current Certificate Details" description="Expiry : 2020/10/23"/>
        <DataCard data="Current Certificate Details" description="Expiry : 2020/10/23"/>
      </Grid>
    </Grid>
  );
}

export default requests;
