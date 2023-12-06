import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Check from "../images/requests.svg";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DataCard = ({ data, description }) => (
  <Card
    sx={{
      p: 2,
      backgroundColor: "#f6f6f6",
      width: {
        xs: "90%",
        sm: "100%",
      },
      height: "27%",
      mx:"auto",
      mb: 3,
      ml: {
        xs: 0,
        sm: 0,
      },
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
            color: "black",
          }}
        >
          {data}
        </Typography>
      </Grid>
      <Grid xs={12}>
        <Typography
          sx={{
            color: "black",
            fontWeight: 400,
            fontFamily: "Poppins",
            textAlign: "left",
            width: 1,
            fontSize: {
              xs: 15,
              sm: 15,
              md: 15,
            },
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
      position: "left",
      align: "middle",
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
      backgroundColor: ["#85cf51", "#f4768a", "#699eee"],
      hoverBackgroundColor: ["#85cf51", "#f4768a", "#699eee"],
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
        p={0}
      >
        <Grid xs={9} sm={4} height={300}>
          <Card sx={{ p: 4, backgroundColor: "#f9f9f9", height: 300 }}>
            <Stack
              direction="column"
              justifyContent="space-around"
              alignItems="center"
              spacing={2}
            >
              <img
                src={Check}
                width="100%"
                style={{ marginTop: 2, marginBottom: 19 }}
              />
              <Button
                variant="outlined"
                sx={{
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

        <Grid xs={12} sm={4} pl={3} height={300}>
          <DataCard data="Certificates Requested" description="13" />
          <DataCard data="Certificates Issued" description="2" />
          <DataCard data="Certificates Rejected" description="11" />
        </Grid>
        <Grid
          container
          xs={12}
          sm={4}
          height={30}
          pl={1}
          sx={{
            mx: "auto",
            textAlign: "center",
          }}
        >
          <div style={{ width: "300px", height: "300px" }}>
            <h1>Certificates Issued</h1>
            <Pie data={data} options={chartOptions} />
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default requests;
