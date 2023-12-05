// this component is used for protect routes
import { Outlet, useLocation, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from "react";

const AuthorizeRoutes = ({ allowedRoles }) => {
  const {state, signIn, signOut, getAccessToken, getIDToken, getBasicUserInfo} = useAuthContext();
  const location = useLocation(); // to redirect the user to where he/she came from

  const [userGroup, setUserGroup] = useState("");

  useEffect(() => { 
    const getAuthInfo = async () => {
        if(!state.isAuthenticated) return;  // If not authenticated, return
    
        getBasicUserInfo().then((info) => {
            console.log(info.groups[0]);
            setUserGroup(info.groups[0]);
        });
    }

    getAuthInfo();
  }
    , []);

  if(!state.isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  if (allowedRoles.includes(userGroup)) { // If the user is authorized to access the route
    return <Outlet /> 
  } else {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />
  }
};

AuthorizeRoutes.propTypes = {
  allowedRoles: PropTypes.array,
};

export default AuthorizeRoutes;