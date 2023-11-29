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
  width: "fit-content",
  maxWidth: "85vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  marginTop: "5%",
  marginBottom: "5%",
  maxHeight: "85vh",
};

export default function BasicModal({ open, setOpen, base64Image }) {
  const handleClose = () => setOpen(false);

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
            <img
              src={base64Image}
              style={{ width: "100%", height: "85vh", maxHeight: "85vh" }}
            />
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
