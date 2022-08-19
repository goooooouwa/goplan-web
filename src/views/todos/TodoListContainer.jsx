import httpService from "services/httpService";
import React, { useEffect, useState } from "react";
import TodoListItem from "components/TodoListItem";
import { Container, Grid, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import TodoActionGroup from "components/TodoActionGroup";
import { useAPIError } from "hooks/useAPIError";
import todoTraversal from "utils/todoTraversal";
import { useTranslation } from 'react-i18next';

export default function TodoListContainer() {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const url = params.projectId !== undefined ? `/todos.json?project_id=${params.projectId}` : '/todos.json';
  const [todos, setTodos] = useState([]);
  const { addError } = useAPIError();

  useEffect(() => {
    reloadTodos();
  }, [params.projectId]);

  const reloadTodos = () => {
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
  };

  const handleTodoChange = (event, todo) => {
    const todoData = {
      status: event.target.checked,
    };

    httpService.put(`/todos/${todo.id}.json`, todoData)
      .then((response) => {
        const updatedTodo = response.data;
        setTodos((todos) => {
          return todoTraversal.updateTodosAndChildren(todos, updatedTodo);
        });
      })
      .catch(function (error) {
        addError(error.response.data, error.response.status);
        console.log(error);
      });
  };

  const loadChildren = (todo) => {
    if (!(todo.numberOfChildren > 0 && todo.children.length === 0)) {
      return;
    }

    httpService.get(`/todos/${todo.id}/children.json`)
      .then((response) => {
        const updatedTodo = {
          ...todo,
          children: response.data,
        }
        setTodos((todos) => {
          return todoTraversal.updateTodosAndChildren(todos, updatedTodo);
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
                {t('Tasks')}
              </Typography>
              <TodoActionGroup activeViewTitle={t("List")} />
            </Stack>
          </Grid>
          {todos
            .map((todo, index) => (
              <TodoListItem key={index} todo={todo} handleTodoChange={handleTodoChange} loadChildren={loadChildren} />
            ))}
        </Grid>
      </Container>
    </>
  );
}