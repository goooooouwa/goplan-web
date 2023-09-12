import { Button, Container, Fab, Grid, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ProjectList from "components/ProjectList";
import httpService from "services/httpService";
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useAPIError } from "hooks/useAPIError";
import { Add } from "@mui/icons-material";

export default function ProjectListContainer() {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState([]);
  const { addError } = useAPIError();

  useEffect(() => {
    httpService.get('/projects.json')
      .then((response) => {
        setProjects(response.data);
      })
      .catch(function (error) {
        // handle error
        addError(error.response.data, error.response.status);
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [addError]);

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
              <Typography variant="h4" component="div">
                {t('Goals')}
              </Typography>
              <Button variant="contained" component={RouterLink} to={'/projects/new'} sx={{
                maxWidth: 160,
                display: { xs: 'none', sm: 'block' },
              }}>
                {t('New Goal')}
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <ProjectList projects={projects} />
          </Grid>
        </Grid>
        <Fab color="primary" aria-label="add" component={RouterLink} to={'/projects/new'} sx={{
          display: { sm: 'none' },
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}>
          <Add />
        </Fab>
      </Container>
    </>
  );
}
