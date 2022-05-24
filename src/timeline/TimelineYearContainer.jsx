import React, { useEffect, useState } from "react";
import httpService from "httpService";
import TimelineYear from "components/TimelineYear";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";

export default function TimelineYearPage() {
  const params = useParams();
  const [todos, setTodos] = useState([]);
  const todoListUrl = params.projectId != null ? `/projects/${params.projectId}/todos` : '/todos';

  useEffect(() => {
    let url = '/todos.json';
    if (params.projectId != null) {
      url += `?project_id=${params.projectId}`;
    }
    httpService.get(url)
      .then((response) => {
        setTodos(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [params.projectId]);

  return (
    <>
      <Container sx={{ mt: 2 }}>
        <Grid container>
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
              spacing={2}
            >
            <Typography variant="h3" component="div" gutterBottom>
              Timeline (Year)
            </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignItems={{ xs: 'stretch', sm: 'baseline' }}
                justifyContent="space-between"
                spacing={2}
              >
                <Button variant="contained" component={RouterLink} to={'/todos/new'} sx={{ maxWidth: 160 }}>
                  New Todo
                </Button>
                <Button variant="outlined" component={RouterLink} to={todoListUrl} sx={{ maxWidth: 160 }}>
                  Show Todos
                </Button>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <TimelineYear todos={todos} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
