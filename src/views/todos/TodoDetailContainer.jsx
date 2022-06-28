import TodoDetail from "components/TodoDetail";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import httpService from "services/httpService";
import { Button, Checkbox, Container, Grid, Stack, Typography, IconButton } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { useAPIError } from "hooks/useAPIError";

export default function TodoDetailContainer() {
  const params = useParams();
  const [todo, setTodo] = useState({
    projectId: "",
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    repeat: false,
    repeatPeriod: "",
    repeatTimes: 0,
    instanceTimeSpan: "",
    status: false,
    dependencies: [],
    dependents: []
  });
  const todoListUrl = params.projectId !== undefined ? `/projects/${params.projectId}/todos` : '/todos';
  const todoEditUrl = params.projectId !== undefined ? `/projects/${params.projectId}/todos/${todo.id}/edit` : `/todos/${todo.id}/edit`;
  const { addError } = useAPIError();

  useEffect(() => {
    httpService.get(`/todos/${params.todoId}.json`)
      .then((response) => {
        setTodo(response.data);
      })
      .catch(function (error) {
        // handle error
        addError(error.response.data, error.response.status);
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [params.todoId]);

  const handleTodoChange = (event, todo) => {
    const todoData = {
      status: event.target.checked,
    };

    httpService.put(`/todos/${todo.id}.json`, todoData)
      .then((response) => {
        setTodo(response.data);
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
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Checkbox
                  checked={todo.status}
                  onChange={(event) => { handleTodoChange(event, todo) }}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
                <Typography variant="h4" component="div">
                  {todo.name}
                </Typography>
                <IconButton component={RouterLink} to={todoEditUrl} sx={{ maxWidth: 160 }}>
                  <EditIcon />
                </IconButton>
              </Stack>
              <Button variant="contained" component={RouterLink} to={todoListUrl} sx={{ maxWidth: 160 }}>
                Todos
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <TodoDetail todo={todo} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
