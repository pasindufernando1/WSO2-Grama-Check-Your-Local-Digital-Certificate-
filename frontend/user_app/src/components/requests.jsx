import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Check from "../images/request_cert.svg";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { AiFillBank } from "react-icons/ai";
import { AiFillFileExcel } from "react-icons/ai";
import { AiFillFile } from "react-icons/ai";
import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiCaller from "../api/apiCaller";

const DataCard = ({ data, description, icon: IconComponent }) => (
  <Card
    sx={{
      p: 2,
      mt: 1,
      backgroundColor: "#f6f6f6",
      width: "100%",
      height: "30%",
    }}
  >
    <Grid container>
      <Grid xs={10} flexDirection={"row"}>
        {IconComponent && <IconComponent fontSize={18} />}
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
          mt={1}
        >
          {data}
        </Typography>
      </Grid>
      <Grid xs={12} mt={0}>
        <Typography
          sx={{
            color: "black",
            fontWeight: 500,
            textAlign: "left",
            fontFamily: "Poppins",
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

 function Requests() {
  const [displayName, setDisplayName] = useState("");
  const { state, getBasicUserInfo, httpRequest } = useAuthContext();
  const [userInfo, setUserInfo] = useState({});
  const [userCertificateRequests, setUserCertificateRequests] = useState([]);
  const [latestCertificateRequest, setLatestCertificateRequest] = useState({});
  const [loading, setLoading] = useState(true);

  const [latestCertificateExpiryDate, setLatestCertificateExpiryDate] = useState(null);
  const [latestCertificateGramaDivisionName, setLatestCertificateGramaDivisionName] = useState(null);


  useEffect(() => {
    const authInfo = async () => {
      if (!state.isAuthenticated) return;

      const info = await getBasicUserInfo();

      setUserInfo(info);
      setDisplayName(info.displayName);

      //the following code is to get the user's certificate requests
      try {
        const certificateResponse = await apiCaller("certificates", "GET", null, {
          user_id: info.sub
        });

        if (certificateResponse.status === 200) {
          console.log(certificateResponse);
          setUserCertificateRequests(certificateResponse.data);
        }
      }
      catch (error) {
        if (error.response.status === 404) { //has no certificates
          setUserCertificateRequests([]);
        }
      }
    }

    authInfo();
  }, []);

  useEffect(() => {
    const getLatestCertificateRequest = async () => {
      
      if (userCertificateRequests.length > 0) {
        console.log("more than 0");

        //the following code is to get the user's latest certificate request
        try {
          const latestCertificateResponse = await apiCaller(`certificate/${state.sub}/current`, "GET");

          if (latestCertificateResponse.status === 200) {
            console.log(latestCertificateResponse);
            setLatestCertificateRequest(latestCertificateResponse.data);

            if(latestCertificateResponse.data.status === "APPROVED" || latestCertificateResponse.data.status === "COLLECTED"){
              const expiryDateObj = new Date(latestCertificateResponse.data.issued_date);

              //expiry date is 6 months from the issued date
              expiryDateObj.setMonth(expiryDateObj.getMonth() + 6);
              setLatestCertificateExpiryDate(expiryDateObj);
            }
          }
        }
        catch (error) {
          if (error.response.status === 404) { //has no certificates
            setLatestCertificateRequest({});
          }
        }
      }
    }

    getLatestCertificateRequest();
  }, [state.sub, userCertificateRequests]);

  //get the grama division name using the grama division id of the latest certificate request

  useEffect(() => {
    const getGramaDivisionName = async () => {
      if (latestCertificateRequest.grama_divisionId) {
        try {
          const gramaDivisionResponse = await apiCaller(`gramadivisions`, "GET");

          if (gramaDivisionResponse.status === 200) {
            console.log(gramaDivisionResponse);
            const gramaDivision = gramaDivisionResponse.data.find((gramaDivision) => gramaDivision.id === latestCertificateRequest.grama_divisionId);
            setLatestCertificateGramaDivisionName(gramaDivision.name);
          }
        }
        catch (error) {
          console.log(error);
        }
      }
      setLoading(false);
    }

    getGramaDivisionName();
  }, [latestCertificateRequest]);


  return (
    loading ? <div>Loading...</div> :
    <>
    <Card
      sx={{
        p: 2,
        mt: 1,
        mb: 2,
        backgroundColor: "#f6f6f6",
        width: "96%",
        height: "30%",
      }}
    >
      <Grid container>
        <Grid xs={10}>
          <Typography
            variant="h7"
            sx={{
              fontWeight: 400,
              fontFamily: "Poppins",
              color: "black",
            }}
          >
            Hello {displayName},
          </Typography>
        </Grid>
        <Grid xs={12} mt={1}>
          <Typography
            sx={{
              color: "black",
              textAlign: "left",
              width: 1,
              fontSize: {
                xs: 11,
                sm: 13,
                md: 13,
              },
            }}
          >
            Use the GramaCert to quickly obtain your certificates without a
            hassle
          </Typography>
        </Grid>
      </Grid>
    </Card>
    <Grid
      container
      sx={{
        width: { xs: "100%", sm: "70vw" },
      }}
      justifyContent="center"
    >
      <Grid xs={12} sm={6}>
        <Card sx={{ p: 4, backgroundColor: "#f9f9f9" }}>
          <Stack
            direction="column"
            justifyContent="space-around"
            alignItems="center"
            spacing={2}
          >
            <img src={Check} width="40%" style={{ marginTop: 2 }} />
            <Link to="/applyCert">
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
            </Link>
            <Link to="/checkstatus">
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
                  backgroundColor: "black",
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
                Check Status
              </Button>
            </Link>
          </Stack>
        </Card>
      </Grid>
      <Grid
        container
        xs={12}
        sm={5}
        sx={{
          mx: "auto",
        }}
      >
        <DataCard
          data="Grama Division Assigned Based on Latest Certificate Request"
          description={latestCertificateGramaDivisionName ? latestCertificateGramaDivisionName : "No certificates issued yet"}
          icon={AiFillBank}
        />
        <DataCard
          data="Latest Issued Certificate Details"
          description={latestCertificateExpiryDate ? `Expiry Date: ${latestCertificateExpiryDate.toDateString()}` : "No certificates issued yet"}
          icon={AiFillFileExcel}
        />
        <DataCard
          data="Number of Obtained certificates"
          description={userCertificateRequests.filter((certificate) => certificate.status === "COLLECTED").length}
          icon={AiFillFile}
        />
      </Grid>
    </Grid>
  </>
  );
}

export default Requests;
