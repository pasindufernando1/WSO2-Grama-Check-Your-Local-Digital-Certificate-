import React from "react";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';

function dashboardNumbers(props) {
  return ( 
    <Card sx={{ pt: 2, pb:2, backgroundColor: "#09ad58", width: "70vw", mt:2 , marginRight: "auto", marginLeft: "auto" }}>
          <CardContent>
            <Stack direction='row' alignItems='center' justifyContent="space-around" divider={<Divider orientation="vertical" flexItem />}>
              <Stack>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    fontFamily: "Segoe UI"
                  }}
                  >
                  Grama Niladari Division
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    fontFamily: "Segoe UI",
                    color: "#fff"
                  }}>
                  {props.grama}
                </Typography>
              </Stack>
              <Stack>
                <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  fontFamily: "Segoe UI"
                }}
                >
                  Division
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    fontFamily: "Segoe UI",
                    color: "#fff"
                  }}>
                  {props.division}
                </Typography>
              </Stack>
              <Stack>
                <Typography 
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  fontFamily: "Segoe UI"
                }}
                >
                  District
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    fontFamily: "Segoe UI",
                    color: "#fff"
                  }}>
                  {props.district}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
  );
}

export default dashboardNumbers;
