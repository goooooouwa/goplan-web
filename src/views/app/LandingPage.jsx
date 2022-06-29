import { Button, Container, Grid, Link, Stack } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";

export default function LandingPage() {
  const { getAccessToken, signInPage, handleOfflineMode } = useAuth();

  return (
    <>
      {getAccessToken() !== null &&
        <Navigate to="/" />
      }
      <Container sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1>GoPlan</h1>
            <h2>Where todos meets a timeline</h2>
            <p>GoPlan is an app to help you achieve your goals, by turning your plan into actionable tasks that can be easily managed over time with a timeline overview.</p>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" component={Link} href={signInPage}>
              Sign up / Login
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" onClick={handleOfflineMode}>
              Try it without login
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
