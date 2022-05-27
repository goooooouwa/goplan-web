import httpService from "httpService";
import React, { useEffect, useState } from "react";
import TodoList from "components/TodoList";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useParams, Outlet, Link as RouterLink } from "react-router-dom";
import MasterDetailsLayout from "components/MasterDetailsLayout";

export default function TodoListContainer() {
  const params = useParams();
  const [todos, setTodos] = useState([]);
  const timelineYearUrl = params.projectId !== undefined ? `/projects/${params.projectId}/year` : '/timeline';
  const timelineMonthUrl = params.projectId !== undefined ? `/projects/${params.projectId}/month` : '/timeline/month';
  const timelineWeekUrl = params.projectId !== undefined ? `/projects/${params.projectId}/week` : '/timeline/week';
  const newTodoUrl = params.projectId !== undefined ? `/projects/${params.projectId}/todos/new` : '/todos/new';

  useEffect(() => {
    const url = params.projectId !== undefined ? `/todos.json/?project_id=${params.projectId}` : '/todos.json';
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h3" component="div">
                Todos
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignItems={{ xs: 'stretch', sm: 'baseline' }}
                justifyContent="space-between"
                spacing={2}
              >
                <Button variant="contained" component={RouterLink} to={newTodoUrl} sx={{ maxWidth: 160 }}>
                  New Todo
                </Button>
                <Button variant="outlined" component={RouterLink} to={timelineYearUrl} sx={{ maxWidth: 160 }}>
                  Year
                </Button>
                <Button variant="outlined" component={RouterLink} to={timelineMonthUrl} sx={{ maxWidth: 160 }}>
                  Month
                </Button>
                <Button variant="outlined" component={RouterLink} to={timelineWeekUrl} sx={{ maxWidth: 160 }}>
                  Week
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