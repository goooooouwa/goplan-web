import { Button, Link } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";

export default function LandingPage() {
  const { getAccessToken, signInPage, logoutPage, handleOfflineMode } = useAuth();

  return (
    <>
      {getAccessToken() !== null &&
        <Navigate to="/projects" />
      }
      <h1>GoPlan Web: a todo app with a timeline view</h1>
      <p>It's designed to help you achieve your goals by turning your plans into actionable tasks that are super easy to manage over time.</p>
      <Button variant="contained" component={Link} href={signInPage}>
        Staring using GoPlan
      </Button>
      <br/>
      <Button variant="outlined" onClick={handleOfflineMode}>
        Use it offline
      </Button>
    </>
  );
}
