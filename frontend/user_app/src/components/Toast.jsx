import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const vertical = "bottom";
const horizontal = "right";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({ open, setOpen, mode,text }) {
  React.useEffect(() => {
    return setOpen(true);
  }, [mode]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  if (mode == 0) {
    return (
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {text}
          </Alert>
        </Snackbar>
      </Stack>
    );
  }

  if (mode == 1) {
    return (
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {text}
          </Alert>
        </Snackbar>
      </Stack>
    );
  }
}
