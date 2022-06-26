import { Button, Link } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";

export default function GoodByePage() {
  const { getAccessToken, logoutPage } = useAuth();

  return (
    <>
      {getAccessToken() !== null &&
        <Navigate to="/projects" />
      }
      <p>Logged out of GoPlan Web. Click if you want to sign out your GoPlan account as well: </p>
      <Button variant="contained" component={Link} href={logoutPage}>
        Go to GoPlan to sign out
      </Button>
    </>
  );
}
