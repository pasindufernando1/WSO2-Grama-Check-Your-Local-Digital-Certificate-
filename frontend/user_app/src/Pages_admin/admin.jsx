import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SideNav from "../components/sideNav";
import Dashboard from "../Pages_admin/dashboard";
import Requests from "../Pages_admin/requests";

const override = {
  display: "block",
  margin: "0 auto",
  marginTop: "20%",
};

function Admin() {
  return (
    <>
      <SideNav index={0} />
      <Routes>
        <Route path="/admin/dashboard" component={Dashboard} />
        <Route path="/admin/requests" component={Requests} />
      </Routes>
    </>
  );
}

export default Admin;
