import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ProjectList from "components/ProjectList";
import httpService from "services/httpService";
import React, { useEffect, useState } from "react";

export default function ProjectListContainer() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    httpService.get('/projects.json')
      .then((response) => {
        setProjects(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
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
              spacing={2}
            >
              <Typography variant="h3" component="div">
                Goals
              </Typography>
              <Button variant="contained" component={RouterLink} to={'/projects/new'} sx={{ maxWidth: 160 }}>
                New Goal
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <ProjectList projects={projects} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
