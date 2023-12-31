import { Outlet, useLocation, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from "react";

const AuthorizeRoutes = ({ allowedRoles }) => {
    const { state, signIn, signOut, getAccessToken, getIDToken, getBasicUserInfo } = useAuthContext();
    const location = useLocation();
    const [userGroup, setUserGroup] = useState("");
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
        const getAuthInfo = async () => {
            if (!state.isAuthenticated) return;

            const info = await getBasicUserInfo();

            if(info.groups === undefined){ //there is no groups attribute in the token
                setUserGroup("Citizen-PSSR");
                setIsLoading(false); // Set loading state to false after fetching user info
                return;
            }

            setUserGroup(info.groups[0]);
            setIsLoading(false); // Set loading state to false after fetching user info
        };

        getAuthInfo();
    }, [getBasicUserInfo, state.isAuthenticated]);

    if (isLoading) {
        return <div>Loading...</div>; // Render a loading indicator while fetching user info
    }

    if (!state.isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    if (allowedRoles.includes(userGroup)){
        return <Outlet />;
    } else {
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
};

AuthorizeRoutes.propTypes = {
    allowedRoles: PropTypes.array
};

export default AuthorizeRoutes;