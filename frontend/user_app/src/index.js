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
            signInRedirectURL: "https://ffc88583-eeb1-4faf-87b5-41f431c73b41.e1-us-east-azure.choreoapps.dev",
            signOutRedirectURL: "https://ffc88583-eeb1-4faf-87b5-41f431c73b41.e1-us-east-azure.choreoapps.dev",
            clientID: "XNYgoWhNc3h24IcfpDh5OPbNIyoa",
            baseUrl: "https://api.asgardeo.io/t/wso2shamin",
            scope: [ "openid","profile", "email", "app_roles", "can_request_certificate_scope","create_certificate_request_scope","get_certificate_requests_scope", "get_grama_divisions_scope", "update_user_certificate_requests_scope"]
        } }
    >
      <AppRoute />
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
