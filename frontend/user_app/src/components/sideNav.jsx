import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";

const drawerWidth = "20%";


export default function PermanentDrawerLeft({ index }) {
  

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Drawer
          PaperProps={{
            sx: {
              backgroundColor: "black",
              color: "rgb(255 255 255 / 87%)",
            },
          }}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Grid
            container
            sx={{ marginTop: 4, marginBottom: 4 }}
            direction="column"
          >
            <Grid xs={4}>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: 400,
                  mt: 1,
                  marginLeft: "80%",
                  fontFamily: "Segoe UI",
                }}
              >
                GramaCert
              </Typography>
            </Grid>

          </Grid>

          <List>
              <Link
                to={1}
                style={{ textDecoration: "none", color: "white" }}
              >
                <ListItem
                  key={1}
                  disablePadding
                  sx={{
                    transition: "0.3s ease",
                    height: "8vh",

                    ":hover": {
                      backgroundColor: "#699eee",
                      transition: "0.3s ease",
                    },
                  }}
                >
                  <ListItemButton>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText
                      primary={"Apply Certificate"}
                      sx={{
                        fontWeight: 600,
                        fontFamily: "Segoe UI",
                        textDecoration: "none",
                      }}
                    ></ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link
                to={1}
                style={{ textDecoration: "none", color: "white" }}
              >
                <ListItem
                  key={1}
                  disablePadding
                  sx={{
                    transition: "0.3s ease",
                    height: "8vh",

                    ":hover": {
                      backgroundColor: "#699eee",
                      transition: "0.3s ease",
                    },
                  }}
                >
                  <ListItemButton>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText
                      primary={"Check Status"}
                      sx={{
                        fontWeight: 600,
                        fontFamily: "Segoe UI",
                        textDecoration: "none",
                      }}
                    ></ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link
                to={1}
                style={{ textDecoration: "none", color: "white" }}
              >
                <ListItem
                  key={1}
                  disablePadding
                  sx={{
                    transition: "0.3s ease",
                    height: "8vh",

                    ":hover": {
                      backgroundColor: "#699eee",
                      transition: "0.3s ease",
                    },
                  }}
                >
                  <ListItemButton>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText
                      primary={"Help"}
                      sx={{
                        fontWeight: 600,
                        fontFamily: "Segoe UI",
                        textDecoration: "none",
                      }}
                    ></ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
          </List>

          <div
            style={{
              marginLeft: "17%",
              position: "absolute",
              bottom: 50,
            }}
          >
            <Button
              variant="contained"
              sx={{
                width: "130%",
                backgroundColor: "#699eee",
                ":hover": {
                  backgroundColor: "#699eee",
                },
              }}
            >
              Logout
            </Button>
          </div>
        </Drawer>
      </Box>
    </div>
  );
}
