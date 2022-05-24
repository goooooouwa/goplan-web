import httpService from "httpService";
import React, { useEffect, useState } from "react";
import TodoList from "components/TodoList";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useParams, Outlet, Link as RouterLink } from "react-router-dom";
import MasterDetailsLayout from "components/MasterDetailsLayout";

export default function TodoListContainer() {
  const params = useParams();
  const [todos, setTodos] = useState([]);
  const timelineUrl = params.projectId != null ? `/projects/${params.projectId}/timeline` : '/timeline';

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
        <Grid container >
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
              spacing={2}
            >
              <Typography variant="h3" component="div" gutterBottom>
                Todos
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
                <Button variant="outlined" component={RouterLink} to={timelineUrl} sx={{ maxWidth: 160 }}>
                  Show Timeline
                </Button>
              </Stack>
            </Stack>
          </Grid>
          <MasterDetailsLayout
            master={
              <TodoList todos={todos} />
            }
            details={
              <Outlet />
            } />
        </Grid>
      </Container>
    </>
  );
}