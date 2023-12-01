import React from 'react';
import { useAuthContext } from "@asgardeo/auth-react";
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const Logout = () => {
    const { signOut, state } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (state.isAuthenticated) {
            signOut();
        }
        else{
            navigate("/");
        }
    }, [state.isAuthenticated]);
    

    return (
        <div></div>
    )
}

export default Logout