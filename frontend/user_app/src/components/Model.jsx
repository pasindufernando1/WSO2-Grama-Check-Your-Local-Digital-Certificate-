import * as React from "react";
import Box from "@mui/material/Box";
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

export default function BasicModal({
  open,
  setOpen,
  inputType,
  dataRequestedAddress,
  dataActualAddress,
  dataCriminal,
}) {
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
            {inputType === 1 ? (
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
                    {dataRequestedAddress}
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
                    {dataActualAddress}
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
                  sx={{
                    width: "50%",
                    textAlign: "left",

                    p: 1,
                  }}
                  color="text.secondary"
                >
                  {dataCriminal.eligibility === false &&
                    dataCriminal.records && (
                      <div style={{width:"100%"}}>
                          {dataCriminal.records.map((record, index) => (
                            <Grid
                              container
                              spacing={2}
                              sx={{
                                borderBottom: "0.1px solid #ccc",
                                margin: 2,
                              }}
                            >
                              <Grid item xs={6}>
                                <Typography>{record.record}</Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography sx={{ fontSize: 14 }}>
                                  {record.date.year}.{record.date.month}.
                                  {record.date.day}
                                </Typography>
                              </Grid>
                            </Grid>
                          ))}
                      </div>
                    )}
                </Typography>
              </>
            )}
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
