import httpService from "httpService";
import React, { useEffect, useState } from "react";
import TodoList from "components/TodoList";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useParams, Outlet, Link } from "react-router-dom";
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
          <Grid
            container
            spacing={2}
            item
          >
            <Grid item xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="baseline"
                spacing={2}
              >
                <Typography variant="h4" component="div" gutterBottom>
                  Todos
                </Typography>
                <Button variant="contained" component={Link} to={timelineUrl} sx={{ maxWidth: 160 }}>
                  Show Timeline
                </Button>
              </Stack>
            </Grid>
          </Grid>
          <Grid container item>
            <MasterDetailsLayout
              master={
                <TodoList todos={todos} />
              }
              details={
                <Outlet />
              } />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}