import { Container, CssBaseline, Grid, Box, Stack, CircularProgress } from "@mui/material";
import ResponsiveAppBar from "components/ResponsiveAppBar";
import React from "react";
import { Outlet } from "react-router-dom";
import { useLoading } from 'hooks/useLoading';
import moment from 'moment';

moment.locale('en');

function AppLayout() {
  const { loading } = useLoading();

  return (
    <>
      <CssBaseline />
      <div>
        <ResponsiveAppBar />
        <Outlet />
        {loading &&
          <Grid item xs={12}>
            <Stack alignItems="center" justifyContent="center" sx={{ height: 200 }}>
              <CircularProgress />
            </Stack>
          </Grid>
        }
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
