import httpService from "services/httpService";
import React, { useEffect, useState } from "react";
import TodoListItem from "components/TodoListItem";
import { Container, Grid, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import TodoActionGroup from "components/TodoActionGroup";
import { useAPIError } from "hooks/useAPIError";
import todoTraversal from "utils/todoTraversal";

export default function TodoListContainer() {
  const params = useParams();
  const [todos, setTodos] = useState([]);
  const todosInJSON = JSON.stringify(todos);
  const { addError } = useAPIError();

  useEffect(() => {
    const url = params.projectId !== undefined ? `/todos/children.json?project_id=${params.projectId}` : '/todos/children.json';
    httpService.get(url)
      .then((response) => {
        setTodos(response.data);
      })
      .catch(function (error) {
        // handle error
        addError(error.response.data, error.response.status);
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [params.projectId, todosInJSON, addError]);

  const handleTodoChange = (event, todo) => {
    const todoData = {
      status: event.target.checked,
    };

    httpService.put(`/todos/${todo.id}.json`, todoData)
      .then((response) => {
        const updatedTodo = response.data;
        setTodos((todos) => {
          return todoTraversal.updateTodosAndDependencies(todos, updatedTodo);
        });
      })
      .catch(function (error) {
        addError(error.response.data, error.response.status);
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
          {todos
            .map((todo, index) => (
              <TodoListItem key={index} todo={todo} handleTodoChange={handleTodoChange} />
            ))}
        </Grid>
      </Container>
    </>
  );
}