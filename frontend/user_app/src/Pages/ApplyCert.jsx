import React, { useState } from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Select } from "@mui/material";
import SideBar from "../components/SideBar";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { useEffect } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import apiCaller from "../api/apiCaller";

const override = {
  display: "block",
  margin: "0 auto",
  marginTop: "18%",
  marginLeft: "53%",
};

function ApplyCertificate() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const [nic, setNic] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [line3, setLine3] = useState("");
  const [grama, setGrama] = useState([]);
  const [city, setCity] = useState("");
  const [selectedGrama, setSelectedGrama] = useState("");

  const { httpRequest, state } = useAuthContext();

  useEffect(() => {
    const getGramaDivisions = async () => {
      try{
        const response = await apiCaller('gramadivisions', 'GET');

        console.log(response);
  
        if (response.status === 200) {
          setGrama(response.data);
        }
      }
      catch(error){
        console.log(error);
      }
    }

    getGramaDivisions();
  }, []);

  const createCertificateRequest = async (e) => {
    if(nic === "") {
      alert("please enter nic");
      return;
    }

    if(line1 === ""){
      alert("please enter line1");
      return;
    }

    if(line2 === ""){
      alert("please enter line2");
      return;
    }

    if(city === ""){
      alert("please enter city");
      return;
    }

    if(selectedGrama === ""){
      alert("please select grama division");
      return;
    }

    const sendingData = {
      nic : nic,
      address: {
        line_01: line1,
        line_02: line2,
        line_03: line3,
        city: city
      },
      grama_division_id: selectedGrama,
      user_id: state.sub
    }

    console.log(sendingData);

  }

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="pt-8">
        <Box
          component="main"
          margin={"auto"}
          sx={{
            mt: 8,
            flexGrow: 1,
            bgcolor: "white",
            p: 3,
            width: {
              sm: "70%",
              md: "70%",
              lg: "70vw",
            },
            ml: {
              xs: "0%",
              sm: "25%",
            },
            borderRadius: 4,
            boxShadow: { xs: 0, sm: 2 },
          }}
        >
          <Grid
            container
            direction="column"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: { sm: "center" },
              width: { xs: "80%", md: "100%", lg: "100%" },
              mx: "auto",
            }}
          >
            <Grid container>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  mb: 5,
                  mt: { xs: "5%", sm: "0%", md: "0%" },
                  fontWeight: 500,
                  textAlign: "center",
                  fontFamily: "Poppins",
                  fontSize: {
                    xs: 16,
                    sm: 20,
                    md: 20,
                    lg: 22,
                  },
                }}
              >
                You can apply for your{" "}
                <span style={{ color: "#699eee" }}>Grama certificate</span> by
                filling the following information
              </Typography>
            </Grid>

            <Grid>
              <InputLabel htmlFor="username" sx={{ color: "black" }}>
                NIC or Passport ID
              </InputLabel>
              <TextField
                id="filled-helperText"
                label=""
                variant="standard"
                size="small"
                sx={{ width: { xs: "100%", sm: "50vw" }, mb: 2 }}
                InputLabelProps={{
                  sx: { fontSize: { xs: 12, sm: 12 } }, // Adjust the font size as needed
                }}
                mt="1"
                onChange={(e) => setNic(e.target.value)}
              />
            </Grid>

            <Grid>
              <InputLabel htmlFor="username" sx={{ color: "black" }}>
                Address
              </InputLabel>
              <TextField
                id="standard-helperText"
                label="Line 1"
                variant="standard"
                size="small"
                sx={{ width: { xs: "100%", sm: "50vw" }, mb: 1 }}
                InputLabelProps={{
                  sx: { fontSize: { xs: 12, sm: 12 } }, // Adjust the font size as needed
                }}
                onChange={(e) => setLine1(e.target.value)}
              />
            </Grid>
            <Grid>
              <TextField
                id="standard-helperText"
                label="Line 2"
                variant="standard"
                size="small"
                sx={{ width: { xs: "100%", sm: "50vw" }, mb: 3 }}
                InputLabelProps={{
                  sx: { fontSize: { xs: 12, sm: 12 } }, // Adjust the font size as needed
                }}
                onChange={(e) => setLine2(e.target.value)}
              />
            </Grid>
            <Grid>
              <TextField
                id="standard-helperText"
                label="Line 3"
                variant="standard"
                size="small"
                sx={{ width: { xs: "100%", sm: "50vw" }, mb: 3 }}
                InputLabelProps={{
                  sx: { fontSize: { xs: 12, sm: 12 } }, // Adjust the font size as needed
                }}
                onChange={(e) => setLine3(e.target.value)}
              />
            </Grid>
            <Grid>
              <TextField
                id="standard-helperText"
                label="City"
                variant="standard"
                size="small"
                sx={{ width: { xs: "100%", sm: "50vw" }, mb: 3 }}
                InputLabelProps={{
                  sx: { fontSize: { xs: 12, sm: 12 } }, // Adjust the font size as needed
                }}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>

            <Grid>
              <InputLabel htmlFor="username" sx={{ color: "black" }}>
                Grama Division
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="standard-filled"
                sx={{ width: { xs: "100%", sm: "50vw" } }}
                size="small"
                variant="standard"
                onChange={(e) => setSelectedGrama(e.target.value)}
                value={selectedGrama}
              >
                {grama.map((currGrama) => (
                  <MenuItem value={currGrama.id}>{currGrama.name}</MenuItem>
                ))}

              </Select>
            </Grid>

            <Grid>
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
                  borderRadius: 20,
                  color: "white",
                  ":hover": {
                    borderColor: "#699eee",
                    color: "#699eee",
                  },
                  p: 1,
                }}
                onClick={(e) => createCertificateRequest(e)}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}

export default ApplyCertificate;
