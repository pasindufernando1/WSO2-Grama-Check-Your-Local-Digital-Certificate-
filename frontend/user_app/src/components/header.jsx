import React, { useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const drawerWidth = "18%";

function header({ name }) {
  return (

      <Toolbar>
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{
            ml: {xs:"0%",sm:"21%"},
            fontWeight: 600,
            fontFamily: "Poppins",
            color: "#000",
            textAlign:{xs:"center",sm:"left"},
          }}
        >
          {name}
        </Typography>
      </Toolbar>
  );
}

export default header;
