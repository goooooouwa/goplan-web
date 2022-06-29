import { Button, Container, Grid, Link } from "@mui/material";
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
      <Container sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <p>You've successfully logged out of GoPlan web client. Click below if you want to sign out your GoPlan account as well: </p>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" component={Link} href={logoutPage}>
              GoPlan account
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
