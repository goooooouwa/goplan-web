import { Container, Grid, Typography } from "@mui/material";
import ProjectList from "components/ProjectList";
import httpService from "httpService";
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
            <Typography variant="h3" component="div" gutterBottom>
              Projects
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ProjectList projects={projects} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
