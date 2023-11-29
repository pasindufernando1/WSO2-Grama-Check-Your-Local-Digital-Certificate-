import React from "react";
// mui components
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
// react icons
import { HiMenu } from "react-icons/hi";

// Header component
const Header = ({ toggleSidebar }) => (
  <header className="bg-gray-800 text-white p-4">
    <Grid container spacing={2} className="md">
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
      <Grid item xs={4}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 700, // Set to 700 for bold
            color: "white", // Set to '#000' for black
            textAlign: "Left",
            fontSize: {
              xs: 18,
              sm: 22,
              md: 24,
            },
            ml: {
              xs: 1,
              sm: 1,
              md: 1,
            },
          }}
        >
          GramCert
        </Typography>
        </Grid>
        
        </Grid>
      </Grid>
      <Grid item xs={4}>
      <Typography 
      textAlign="right"
      sx={{ fontSize: {
              xs: 14,
              sm: 16,
              md: 16,
            }}}> Shamin Fernando </Typography>
      </Grid>
    </Grid>
  </header>
);

// Sidebar component
const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div>
      {/* Header */}
      <Header toggleSidebar={toggleSidebar} />

      {/* Sidebar - Hidden by default on small screens */}
      <div
        className={`fixed h-screen bg-gray-800 text-white w-64 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0`}
      >
        <ul className="mt-8">
          <li className="p-4 hover:bg-gray-700">Apply Certificate</li>
          <li className="p-4 hover:bg-gray-700">Check Status </li>
          <li className="p-4 hover:bg-gray-700">Help </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
