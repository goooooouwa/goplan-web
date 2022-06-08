import httpService from "lib/httpService";
import React, { useEffect, useState } from "react";
import { Button, Checkbox, Container, Grid, Stack, Typography, IconButton, Box, Paper } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function AccountDetailContainer(props) {
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    imageUrl: "",
  });

  useEffect(() => {
    httpService.get('/me.json')
      .then((response) => {
        setUser(response.data);
      })
      .catch(function (error) {
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
                      Image URL
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {user.imageUrl}
                    </Typography>
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
