import { CssBaseline } from "@mui/material";
import ResponsiveAppBar from "components/ResponsiveAppBar";
import React from "react";
import { Outlet } from "react-router-dom";
import moment from 'moment';

moment.locale('en');

function AppLayout() {
  return (
    <>
      <CssBaseline />
      <div className="App">
        <ResponsiveAppBar />
        <Outlet />
      </div>
    </>
  );
}

export default AppLayout;
