import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Unstable_Grid2";

const style = {
  position: "absolute",
  top: "40%",
  left: "52%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  maxWidth: "85vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  marginTop: "5%",
  marginBottom: "5%",
  maxHeight: "70vh",
  minHeight: "50vh",
};

export default function BasicModal({ open, setOpen, inputType, inputData }) {
  const handleClose = () => setOpen(false);
  console.log(inputType);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container sx={{ justifyContent: "center", overflow: "auto" }}>
            {inputType === "Address" ? (
              <>
                <Typography
                  variant="h7"
                  sx={{ height: 30, width: "100%", textAlign: "center" }}
                  component="div"
                  mb={2}
                >
                  Address Mismatch of Requested and Actual
                </Typography>
                <div style={{ height: 50, width: "50%", textAlign: "center" }}>
                  <Typography variant="h7" component="div" mb={2}>
                    Requested Address
                  </Typography>
                  <Typography
                  variant="h7"
                  sx={{ height: 70, width: "50%", textAlign: "center" }}
                  color="text.secondary"
                >
                  New
                </Typography>
                </div>
                <div style={{ width: "50%", textAlign: "center" }}>
                  <Typography variant="h8" component="div" mb={2}>
                    Actual Address
                  </Typography>
                  <Typography
                  variant="h7"
                  sx={{ height: 50, width: "50%", textAlign: "center" }}
                  color="text.secondary"
                >
                  New
                </Typography>
                </div>
                
              </>
            ) : (
              <>
              <Typography
                  variant="h7"
                  sx={{ height: 30, width: "100%", textAlign: "center" }}
                  component="div"
                  mb={2}
                >
                  Criminal offenses recorded 
                </Typography>
                <Typography
                variant="h7"
                sx={{ width: "50%", textAlign: "left" ,borderBottom: "0.1px solid #ccc" , p:1, }}
                color="text.secondary"
              >
                New
              </Typography>
              </>
              
            )}
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
