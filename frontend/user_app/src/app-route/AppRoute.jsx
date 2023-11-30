import React from "react";

import { Route, BrowserRouter,Routes } from "react-router-dom";

import Register from '../Pages/Register';
import ApplyCertificate from "../Pages/ApplyCert";
import Help from "../Pages/Help";
import CheckStatus from "../Pages/CheckStatus";
import Dashboard from "../Pages/Dashboard";

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/applyCert" element={<ApplyCertificate />} />
        <Route path="/help" element={<Help />} />
        <Route path="/CheckStatus" element={<CheckStatus />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoute;
