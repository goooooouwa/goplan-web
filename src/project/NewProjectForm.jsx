import { Box, Button, Container, FormControl, Grid, TextField, Typography } from "@mui/material";
import httpService from "httpService";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export default function NewProjectForm() {
  const [project, setProject] = useState({
    id: null,
    goalName: "",
    targetDate: ""
  });

  function handleChange(event) {
    setProject((project) => ({
      ...project,
      [event.target.name]: event.target.value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('A project was submitted:' + project);

    const projectData = {
      goal_name: project.goalName,
      target_date: project.targetDate
    };

    httpService.post('/projects.json', projectData)
      .then((response) => {
        setProject((project) => ({
          ...project,
          id: response.data.id
        }));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      {project.id && (
        <Navigate to={`/projects/${project.id}`} />
      )}
      <Container
        sx={{
          maxWidth: { xs: 600 }
        }}
      >
        <Typography variant="h3" component="div" gutterBottom>
          New Goal
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container alignItems="stretch" justifyContent="center" direction="column">
            <Grid item>
              <TextField
                required
                label="What's your goal?"
                name="goalName"
                margin="normal"
                fullWidth
                value={project.goalName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <label>Target Date:
                <input
                  type="date"
                  name="targetDate"
                  value={project.targetDate}
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
