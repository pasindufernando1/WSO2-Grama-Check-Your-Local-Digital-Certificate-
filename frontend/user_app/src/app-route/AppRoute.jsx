import React from "react";

import { Route, BrowserRouter,Routes } from "react-router-dom";

import Register from '../Pages/Register';
import ApplyCertificate from "../Pages/ApplyCert";
import Help from "../Pages/Help";
import CheckStatus from "../Pages/CheckStatus";
import Dashboard from "../Pages/Dashboard";
import Admin from "../Pages_admin/dashboard";
import Requests from "../Pages_admin/certificate_requests";
import RequestDetails from "../Pages_admin/RequestDetails";

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/applyCert" element={<ApplyCertificate />} />
        <Route path="/help" element={<Help />} />
        <Route path="/CheckStatus" element={<CheckStatus />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/admin/dashboard" element={<Admin />} />
        <Route path="/admin/requests" element={<Requests />} />
        <Route path="/admin/request_details/:id" element={<RequestDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoute;
