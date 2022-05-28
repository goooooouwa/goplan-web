import httpService from "httpService";
import React, { useEffect, useState } from "react";
import TodoList from "components/TodoList";
import { Container, Grid, Stack, Typography } from "@mui/material";
import { useParams, Outlet } from "react-router-dom";
import MasterDetailsLayout from "components/MasterDetailsLayout";
import TodoActionGroup from "components/TodoActionGroup";

export default function TodoListContainer() {
  const params = useParams();
  const [todos, setTodos] = useState([]);

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
              <TodoActionGroup activeViewTitle="Todos" />
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