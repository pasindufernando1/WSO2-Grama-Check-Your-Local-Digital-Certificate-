import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AppRoute from "./app-route/AppRoute";
import { AuthProvider } from "@asgardeo/auth-react";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider
        config={ {
            signInRedirectURL: "http://localhost:3000/",
            signOutRedirectURL: "http://localhost:3000/",
            clientID: "XNYgoWhNc3h24IcfpDh5OPbNIyoa",
            baseUrl: "https://api.asgardeo.io/t/wso2shamin",
            scope: [ "openid","profile" ]
        } }
    >
      <AppRoute />
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
