import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Check from "../images/requests.svg";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from "react";
import apiCaller from "../api/apiCaller";
import { Link } from "react-router-dom";

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
      mx: "auto",
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


function Requests() {
  const { state, getBasicUserInfo } = useAuthContext();

  const [gramaDivision, setGramaDivision] = useState(null);
  const [requests, setRequests] = useState([]);

  const [pending, setPending] = useState(0);
  const [rejected, setRejected] = useState(0);
  const [issued, setIssued] = useState(0);

  const [data, setData] = useState({
    labels: ["Issued", "Rejected", "Pending"],
    datasets: [
      {
        data: [pending, rejected, issued],
        backgroundColor: ["#85cf51", "#f4768a", "#699eee"],
        hoverBackgroundColor: ["#85cf51", "#f4768a", "#699eee"],
      },
    ],
  });

  useEffect(() => {
    const authInfo = async () => {
      if (!state.isAuthenticated) return;

      const info = await getBasicUserInfo();

      try {
        const divisionResponse = await apiCaller('gramadivisions', 'GET');

        if (divisionResponse.status == 200) {
          const divisions = divisionResponse.data;

          const division = divisions.find((division) => division.id == info.gramaDivision);

          setGramaDivision(division);
        }
      }
      catch (error) {
        console.log(error);
      }
    }

    authInfo();
  }
    , []);


  //get the certificate requests for this grama division
  useEffect(() => {
    const getRequests = async () => {
      if (!state.isAuthenticated) return;

      try {
        const requestsResponse = await apiCaller('certificates', 'GET', null, {
          grama_division_id: gramaDivision.id
        });

        if (requestsResponse.status == 200) {
          setRequests(requestsResponse.data);
        }
      }
      catch (error) {
        console.log(error);
      }
    }

    getRequests();
  }
    , [gramaDivision, state.isAuthenticated]);


  useEffect(() => {
    const issued = requests.filter(request => {
      return request.status === 'APPROVED' || request.status === 'COLLECTED';
    }).length;

    setIssued(issued);

    const rejected = requests.filter(request => {
      return request.status === 'REJECTED';
    }).length;

    setRejected(rejected);

    const pending = requests.filter(request => {
      return request.status === 'PENDING';
    }).length;

    setPending(pending);

    setData({
      labels: ["Issued", "Rejected", "Pending"],
      datasets: [
        {
          data: [issued, rejected, pending],
          backgroundColor: ["#85cf51", "#f4768a", "#699eee"],
          hoverBackgroundColor: ["#85cf51", "#f4768a", "#699eee"],
        },
      ],
    });
  }
    , [requests]);



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
        <Grid xs={12} sm={4} height={'70vh'}>
          <Card sx={{ p: 4, backgroundColor: "#f9f9f9", height: '65vh' }}>
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
              <Link to="/admin/requests">
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
              </Link>
            </Stack>
          </Card>
        </Grid>

        <Grid xs={12} sm={4} sx={{ pl: { sm: 3 } }} height={'70vh'}>
          <DataCard data="Pending Certificate Requests" description={pending} />
          <DataCard data="Certificates Issued" description={
            issued
          } />
          <DataCard data="Certificates Rejected" description={
            rejected
          } />
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
          <div style={{ width: "300px", height: "70vh" }}>
            <h1>Certificates Issued</h1>
            <Pie data={data} options={chartOptions} />
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default Requests;
