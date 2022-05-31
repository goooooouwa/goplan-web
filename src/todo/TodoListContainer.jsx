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
  const todosInJSON = JSON.stringify(todos);

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
  }, [params.projectId, todosInJSON]);

  const handleChange = (event, todo) => {
    const todoData = {
      status: event.target.checked,
      project_id: todo.projectId,
      name: todo.name,
      description: todo.description,
      start_date: todo.startDate,
      end_date: todo.endDate,
      repeat: todo.repeat,
      repeat_period: todo.repeatPeriod,
      repeat_times: Math.round(Number(todo.repeatTimes)),
      instance_time_span: Number(todo.instanceTimeSpan),
    };

    httpService.put(`/todos/${todo.id}.json`, todoData)
      .then((response) => {
        const updatedTodo = response.data;
        setTodos((todos) => {
          return todos.map((todo) => {
            if (todo.id === updatedTodo.id) {
              return updatedTodo;
            }
            else {
              return todo;
            }
          });
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
              <Typography variant="h4" component="div">
                Todos
              </Typography>
              <TodoActionGroup activeViewTitle="Todos" />
            </Stack>
          </Grid>
          <MasterDetailsLayout
            master={
              <TodoList todos={todos} handleChange={handleChange} />
            }
            details={
              <Outlet />
            } />
        </Grid>
      </Container>
    </>
  );
}