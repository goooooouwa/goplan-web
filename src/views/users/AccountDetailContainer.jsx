import httpService from "services/httpService";
import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Stack, Typography, Box, Paper } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAPIError } from "hooks/useAPIError";

export default function AccountDetailContainer(props) {
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    imageUrl: "",
  });
  const { addError } = useAPIError();

  useEffect(() => {
    httpService.get('/me.json')
      .then((response) => {
        setUser(response.data);
      })
      .catch(function (error) {
        addError(error.response.data, error.response.status);
        console.log(error);
      });
  }, []);

  return (
    <>
      <Container sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h4" component="div">
                  {user.name}
                </Typography>
              </Stack>
              <Button variant="contained" component={RouterLink} to='/account/edit' sx={{ maxWidth: 160 }}>
                Edit Account
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ my: 2 }}>
              <Paper variant="outlined">
                <Container maxWidth="sm">
                  <Stack spacing={2} alignItems="flex-start" sx={{ m: 2 }}>
                    <Typography variant="h5" gutterBottom>
                      Email
                    </Typography>
                    <Typography variant="body1" gutterBottom textAlign="left" >
                      {user.email}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                      Profile Image
                    </Typography>
                    <img alt={`${user.name}`} src={user.imageUrl} />
                  </Stack>
                </Container>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
