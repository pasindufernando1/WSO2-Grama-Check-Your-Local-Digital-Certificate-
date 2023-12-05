import React from "react";
// mui components
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
// react icons
import { HiMenu } from "react-icons/hi";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";

// Header component
const Header = ({ toggleSidebar }) => (
  <header
    className=" bg-black text-white w-full h-[65px] p-5 fixed top-0 p-4"
    style={{ zIndex: 200 }}
  >
    <Grid container spacing={2} className=" md">
      <Grid item xs={8}>
        <Grid container spacing={2}>
          <Grid item xs={2} className="md:hidden">
            <button
              className="text-white hover:text-gray-300 focus:outline-none "
              onClick={toggleSidebar}
            >
              <HiMenu size={24} />
            </button>
          </Grid>
          <Grid container xs={4} flexDirection="row">
            <Grid xs={3} sm={5}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  mt: 2,
                  fontWeight: 700, // Set to 700 for bold
                  color: "white", // Set to '#000' for black
                  textAlign: "Left",
                  fontSize: {
                    xs: 18,
                    sm: 22,
                    md: 24,
                  },
                  ml: 2,
                  fontFamily: "Poppins",
                }}
              >
                GramCert
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Typography
          textAlign="right"
          sx={{
            fontSize: {
              xs: 14,
              sm: 16,
              md: 16,
            },
            fontFamily: "Poppins",
          }}
        >
          Shamin Fernando{" "}
        </Typography>
      </Grid>
    </Grid>
  </header>
);

// Sidebar component
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { signOut } = useAuthContext();

  return (
    <div>
      {/* Header */}
      <Header toggleSidebar={toggleSidebar} />

      {/* Sidebar - Hidden by default on small screens */}
      <div
        className={`fixed h-screen bg-black text-white w-64  ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 `}
        style={{ zIndex: 100 }}
      >
        <ul className="mt-20">
          <li className="p-4 hover:bg-gray-700">
            <Link to="/admin/dashboard">Home</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/admin/requests">View Requests</Link>
          </li>
        </ul>

        <div className="fixed bottom-0 w-64 p-4">
          <button
            onClick={() => signOut()}
            className=" w-[80%] bg-[#699eee] p-1 pr-3 pl-3 m-3 rounded-lg"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
