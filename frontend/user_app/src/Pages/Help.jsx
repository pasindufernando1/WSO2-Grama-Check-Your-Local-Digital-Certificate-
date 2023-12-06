import React, { useState } from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import SideBar from "../components/SideBar";
import { IoIosArrowDown } from "react-icons/io";

const FaqItem = ({ question, answer, isOpen, toggle }) => (
  <div
    style={{
      borderBottom: "1px solid #ccc",
      padding: "8px 0",
      width: "90%",
      margin: "auto",
    }}
  >
    <div
      onClick={toggle}
      style={{
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <></>
      <span>{question}</span>
      <IoIosArrowDown
        style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
      />
    </div>
    {isOpen && (
      <div style={{ color: "#777", fontSize: "14px", marginTop: "8px" }}>
        {answer}
      </div>
    )}
  </div>
);

const SlackInvitationButton = () => {
  const invitationLink = "https://join.slack.com/t/srsp-gp/shared_invite/zt-27us9689f-luqUwIEwHnugatWX3ghrZA";

  return (
    <Button
      variant="contained"
      color="primary"
      href={invitationLink}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        mt: 1,
        ml: 5,
        width: { xs: "50%", sm: "13.5vw" },
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
      }}
    >
      Join our Slack Workspace
    </Button>
  );
};

function Help() {
  const faqData = [
    {
      id: 1,
      question: "How to apply for certificate? ",
      answer: "React is a JavaScript library for building user interfaces.",
    },
    {
      id: 2,
      question: "What to do when i get rejected from Grama Niladari?",
      answer: "React is a JavaScript library for building user interfaces.",
    },
    {
      id: 3,
      question: "Can i apply before 6 months for another certificate?",
      answer: "React is a JavaScript library for building user interfaces.",
    },
    // Add more FAQ items as needed
  ];

  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (itemId) => {
    setOpenItems((prevOpenItems) =>
      prevOpenItems.includes(itemId)
        ? prevOpenItems.filter((id) => id !== itemId)
        : [...prevOpenItems, itemId]
    );
  };

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="pt-8">
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            p: 3,
            width: { xs: "100%", sm: "70vw" },
            ml: { xs: "0%", sm: "22%" },
            mt: 8,
          }}
        >
          <Grid
            container
            direction="column"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              width: { xs: "100%", md: "100%", lg: "100%" },
              ml: { xs: "0%", md: "0%" },
            }}
          >
            <Grid container xs={12}>
              <Typography
                variant="h3"
                component="div"
                sx={{
                  fontWeight: 500,
                  fontFamily: "Poppins",
                  textAlign: { xs: "center", sm: "left" },
                  fontSize: {
                    xs: 20,
                    sm: 20,
                    md: 20,
                  },
                  mb: 3,
                  mx: { xs: "auto" },
                  ml: { sm: 1 },
                  textAlign: { sm: "left" },
                }}
              >
                What can we <span style={{ color: "#699eee" }}>Help </span>you
                with?
              </Typography>
            </Grid>

            <Grid>
                 <SlackInvitationButton /> 
            </Grid>
          </Grid>

          <Grid container xs={12}>
            <Typography
              variant="h3"
              component="div"
              sx={{
                fontWeight: 500,
                fontFamily: "Poppins",
                textAlign: { xs: "center", sm: "left" },
                fontSize: {
                  xs: 20,
                  sm: 20,
                  md: 20,
                },
                mb: 3,
                mt: 3,
                mx: { xs: "auto" },
                ml: { sm: 1 },
              }}
            >
              Frequently Asked Questions & Answers
            </Typography>
          </Grid>
          <div>
            {faqData.map((item) => (
              <FaqItem
                key={item.id}
                question={item.question}
                answer={item.answer}
                isOpen={openItems.includes(item.id)}
                toggle={() => toggleItem(item.id)}
              />
            ))}
          </div>
        </Box>
      </div>
    </>
  );
}

export default Help;
