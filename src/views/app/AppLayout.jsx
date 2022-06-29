import { Container, CssBaseline, Grid, Box } from "@mui/material";
import ResponsiveAppBar from "components/ResponsiveAppBar";
import React from "react";
import { Outlet } from "react-router-dom";
import moment from 'moment';

moment.locale('en');

function AppLayout() {
  return (
    <>
      <CssBaseline />
      <div>
        <ResponsiveAppBar />
        <Outlet />
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ height: 100 }} >
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default AppLayout;
