import { Button, Container, FormControl, Grid, TextField, Typography } from "@mui/material";
import httpService from "services/httpService";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAPIError } from "hooks/useAPIError";

export default function EditAccountForm() {
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    imageUrl: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
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

  function handleChange(event) {
    setUser((user) => ({
      ...user,
      [event.target.name]: event.target.value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const userData = {
      name: user.name,
      image_url: user.imageUrl,
    };

    httpService.put(`/me.json`, userData)
      .then((response) => {
        setUser(response.data);
      })
      .catch(function (error) {
        setError(error)
        addError(error.response.data, error.response.status);
        console.log(error);
      })
      .then(() => {
        setSubmitted(true);
      });
  }

  return (
    <div>
      {(submitted && error === null) && (
        <Navigate to={`/account`} />
      )}
      <Container
        sx={{
          maxWidth: { xs: 600 },
          mt: 2
        }}
      >
        <Typography variant="h3" component="div" gutterBottom>
          Edit Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container alignItems="stretch" justifyContent="center" direction="column">
            <Grid item>
              <TextField
                required
                label="Username"
                name="name"
                margin="normal"
                fullWidth
                value={user.name || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Image URL"
                name="imageUrl"
                margin="normal"
                fullWidth
                value={user.imageUrl || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <FormControl margin="normal">
                <Button variant="contained" type="submit">Submit</Button>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
}
