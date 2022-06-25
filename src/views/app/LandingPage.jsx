import { Button } from "@mui/material";
import httpService from "services/httpService";
import React from "react";
import { Navigate } from "react-router-dom";

export default function LandingPage() {
  const accessToken = localStorage.getItem("access_token");
  return (
    <>
      {accessToken !== null &&
        <Navigate to={'/projects'} />
      }
      <h1>Welcome to GoPlan Web</h1>
      <Button
        onClick={httpService.signIn}
      >
        Authorize with GoPlan
      </Button>
      <br/>
      <Button
        onClick={httpService.redirectToAPIServer}
      >
        Visit GoPlan
      </Button>
    </>
  );
}
