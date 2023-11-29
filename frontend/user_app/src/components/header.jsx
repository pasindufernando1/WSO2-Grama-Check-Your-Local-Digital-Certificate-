import React, { useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const drawerWidth = "18%";

function header({ name }) {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        bgcolor: "background.default",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{
            ml: "21%",
            fontWeight: 600,
            fontFamily: "Segoe UI",
            color: "#000",
          }}
        >
          {name}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default header;
