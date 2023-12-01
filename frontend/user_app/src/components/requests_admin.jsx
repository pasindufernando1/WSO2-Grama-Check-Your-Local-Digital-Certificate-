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
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DataCard = ({ data, description }) => (
  <Card
    sx={{
      p: 2,
      backgroundColor: "#699eee",
      width: "100%",
      height: "25%",
      mb: 3,
    }}
  >
    <Grid container>
      <Grid xs={10}>
        <Typography
          sx={{
            fontWeight: 400,
            fontFamily: "Poppins",
            fontSize: {
              xs: 11,
              sm: 10,
              md: 12,
            },
            color: "#fff",
          }}
        >
          {data}
        </Typography>
      </Grid>
      <Grid xs={12}>
        <Typography
          variant="h7"
          sx={{
            color: "#fff",
            fontWeight: 500,
            textAlign: "left",
            width: 1,
          }}
        >
          {description}
        </Typography>
      </Grid>
    </Grid>
  </Card>
);

const chartOptions = {
  plugins: {
    legend: {
      position: 'left',
      align: 'middle',
      labels: {
        boxWidth: 10,
        rotation: 90, // Rotate labels 90 degrees
      },
    },
  },
};

const data = {
  labels: ["Issued", "Rejected", "Pending"],
  datasets: [
    {
      data: [30, 40, 30],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
};


function requests() {
  return (
    <>
      <DataCard data="Grama Division " description="Horana Wewala" />
      <Grid
        container
        sx={{
          width: { xs: "100%", sm: "70vw" },
        }}
        justifyContent="center"
      >
        <Grid xs={12} sm={4}>
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
                View Requests
              </Button>
            </Stack>
          </Card>
        </Grid>
        <Grid
          container
          xs={12}
          sm={4}
          height={30}
          sx={{
            mx: "auto",
            textAlign: 'center',
          }}
        >
          <div style={{ width: '300px',height: '250px'}} >
            <h1>Certificates Issued</h1>
            <Pie data={data} options={chartOptions}/>
          </div>
        </Grid>
        <Grid xs={12} sm={3}>
          <DataCard
            data="Grama Division Assigned"
            description="Horana Wewala"
          />
          <DataCard
            data="Current Certificate Details"
            description="Expiry : 2020/10/23"
          />
          <DataCard
            data="Current Certificate Details"
            description="Expiry : 2020/10/23"
          />
        </Grid>
      </Grid>
    </>
  );
}

export default requests;
