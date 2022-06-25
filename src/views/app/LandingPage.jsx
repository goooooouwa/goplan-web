import { Button } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";

export default function LandingPage() {
  const { getAccessToken, signIn, goToAPIServer } = useAuth();
  return (
    <>
      {getAccessToken() !== null &&
        <Navigate to="/projects" />
      }
      <h1>Welcome to GoPlan Web</h1>
      <Button
        onClick={signIn}
      >
        Sign in with GoPlan
      </Button>
      <br/>
      <Button
        onClick={goToAPIServer}
      >
        Go to GoPlan
      </Button>
    </>
  );
}
