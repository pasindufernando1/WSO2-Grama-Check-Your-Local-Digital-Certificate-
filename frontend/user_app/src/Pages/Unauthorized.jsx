import React from 'react';
import { useEffect, useState } from 'react';
import { useAuthContext } from '@asgardeo/auth-react';
import { Link } from 'react-router-dom';

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
            <h1>Unauthorized</h1>
            <p>You are not authorized to access this page.</p>
            <Link to={goBackLink}>
                <button>Go Back</button>
            </Link>
        </>
    )
}

export default Unauthorized