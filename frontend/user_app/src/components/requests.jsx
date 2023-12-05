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

  useEffect(() => {
    const authInfo = async () => {
      if (!state.isAuthenticated) return;

      const info = await getBasicUserInfo();

      setUserInfo(info);
      setDisplayName(info.displayName);

      console.log(window.configs.resourceServerURLs[0] + "certificates?user_id=" + info.sub);

      const certificateResponseConfig = {
        headers: {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/scim+json"
          },
          method: "GET",
          URL: window.configs.resourceServerURLs[0] + "certificates?user_id=" + info.sub,
        },
      }

      const certificateResponse = await httpRequest(certificateResponseConfig);

      if (certificateResponse.status === 200) {
        console.log(certificateResponse);
        setUserCertificateRequests(certificateResponse.data);
      }
    }

    authInfo();
  }, []);

return (
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
              fontWeight: 500,
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
          data="Grama Division Assigned"
          description="Horana Wewala"
          icon={AiFillBank}
        />
        <DataCard
          data="Current Certificate Details"
          description="Expiry : 2020/10/23"
          icon={AiFillFileExcel}
        />
        <DataCard
          data="Number of Obtained certificates"
          description="10"
          icon={AiFillFile}
        />
      </Grid>
    </Grid>
  </>
);
}

export default Requests;
