import { CssBaseline } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import moment from 'moment';

moment.locale('en');

function PublicLayout() {
  return (
    <>
      <CssBaseline />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default PublicLayout;
