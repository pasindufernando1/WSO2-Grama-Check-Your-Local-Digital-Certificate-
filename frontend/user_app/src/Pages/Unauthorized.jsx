import React from 'react';
import { useEffect, useState } from 'react';
import { useAuthContext } from '@asgardeo/auth-react';
import { Link } from 'react-router-dom';
import errorImage from "../images/404.svg";
import Button from "@mui/material/Button";

const Unauthorized = () => {
    const {state, signIn, signOut, getAccessToken, getIDToken, getBasicUserInfo} = useAuthContext();

    const [goBackLink, setGoBackLink] = useState("");

    useEffect(() => {
        const authInfo = async () => {
            if(!state.isAuthenticated){
                setGoBackLink("/");
                return;
            }
        
            getBasicUserInfo().then((info) => {
                if(info.groups[0] === "Grama-PSSR"){
                    setGoBackLink("/admin/dashboard");
                } else {
                    setGoBackLink("/Dashboard");
                }
            });
        }

        authInfo();
    }
    , []);

    return (
        <>
        <div style={{margin:"auto",marginTop:"5%"}}>
        <div
          style={{
            padding: 0,
            margin: 0,
          }}
        >
          <img src={errorImage} style={{ width: "40%",margin:"auto" }} />
        </div>
        </div>
  
  <div  style={{marginTop:"5%",margin:"auto",display: "flex", justifyContent: "center"}}>
        <Link to={goBackLink} style={{ textDecoration: "none", color: "white" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#699eee",
              ":hover": {
                backgroundColor: "#699eee",
              },
            }}
          >
            Go back
          </Button>
        </Link>
        </div>
      </>
    )
}

export default Unauthorized

