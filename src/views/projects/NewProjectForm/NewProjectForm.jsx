import { Button, Container, FormControl, Grid, TextField, Typography } from "@mui/material";
import httpService from "services/httpService";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";

export default function NewProjectForm() {
  const { getCurrentUserId } = useAuth();
  const [project, setProject] = useState({
    id: null,
    userId: getCurrentUserId(),
    name: "",
    targetDate: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(event) {
    setProject((project) => ({
      ...project,
      [event.target.name]: event.target.value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const projectData = {
      user_id: project.userId,
      name: project.name,
      target_date: project.targetDate
    };

    httpService.post('/projects.json', projectData)
      .then((response) => {
        setError(null);
        setProject(response.data);
      })
      .catch(function (error) {
        setError(error.response.data);
        console.log(error);
      })
      .then(() => {
        setSubmitted(true);
      });
  }

  return (
    <div>
      {(submitted && error === null) && (
        <Navigate to={`/projects/${project.id}/todos`} />
      )}
      <Container
        sx={{
          maxWidth: { xs: 600 },
          mt: 2
        }}
      >
        <Typography variant="h3" component="div" gutterBottom>
          New Goal
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container alignItems="stretch" justifyContent="center" direction="column">
            {(error !== null) && (
              <p>{JSON.stringify(error)}</p>
            )}
            <Grid item>
              <TextField
                required
                label="What's your goal?"
                name="name"
                margin="normal"
                fullWidth
                value={project.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <label>Target Date:
                <input
                  type="date"
                  name="targetDate"
                  value={project.targetDate || ''}
                  onChange={handleChange}
                />
              </label>
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
