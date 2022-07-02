import React, { useEffect, useState } from "react";
import httpService from "services/httpService";
import TimelineYear from "components/TimelineYear/TimelineYear";
import { useParams, useSearchParams } from "react-router-dom";
import { Button, Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import moment from "moment";
import TodoActionGroup from "components/TodoActionGroup";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import isInYearRange from 'utils/rangeCheck';
import todoTraversal from "utils/todoTraversal";
import { useAPIError } from "hooks/useAPIError";
import { cloneDeep } from "lodash";

export default function TimelineYearContainer() {
  const params = useParams();
  const todosUrl = params.projectId !== undefined ? `/todos/dependencies.json?project_id=${params.projectId}` : '/todos/dependencies.json';
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedYear = searchParams.get("year") !== null ? moment(searchParams.get("year")) : moment().startOf("year");
  const [todos, setTodos] = useState([]);
  const todosInJSON = JSON.stringify(todos);
  const { addError } = useAPIError();


  const handleTodayClick = (event) => {
    setSearchParams({ year: moment().format("YYYY") });
  }

  const handlePreviousYearClick = (event) => {
    setSearchParams({ year: selectedYear.clone().subtract(1, "years").format("YYYY") });
  }

  const handleNextYearClick = (event) => {
    setSearchParams({ year: selectedYear.clone().add(1, "years").format("YYYY") });
  }

  const handleMonthChange = (todo, months) => {
    const startDate = (todo.startDate !== null) ? moment(todo.startDate) : moment();
    const endDate = (todo.endDate !== null) ? moment(todo.endDate) : moment();

    const todoData = {};

    if (isInYearRange(startDate, selectedYear)) {
      todoData.start_date = startDate.month(months[0]).toISOString();
    }

    if (isInYearRange(endDate, selectedYear)) {
      todoData.end_date = endDate.month(months[1]).toISOString();
    }

    httpService.put(`/todos/${todo.id}.json`, todoData)
      .then((response) => {
        setTodos((todos) => {
          return todoTraversal.updateTodosAndDependencies(todos, response.data);
        });
      })
      .catch(function (error) {
        let updatedTodo = cloneDeep(todo);
        updatedTodo.startDate = todoData.start_date || todo.startDate;
        updatedTodo.endDate = todoData.end_date || todo.endDate;
        setTodos((todos) => {
          return todoTraversal.updateTodosAndDependencies(todos, updatedTodo);
        });
        addError(error.response.data, error.response.status);
        console.log(error);
      });
  }

  const handleTodoChange = (event, todo) => {
    const todoData = {
      status: event.target.checked,
    };

    httpService.put(`/todos/${todo.id}.json`, todoData)
      .then((response) => {
        setTodos((todos) => {
          return todoTraversal.updateTodosAndDependencies(todos, response.data);
        });
      })
      .catch(function (error) {
        addError(error.response.data, error.response.status);
        console.log(error);
      });
  };

  useEffect(() => {
    httpService.get(todosUrl)
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
  }, [todosUrl, todosInJSON]);

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
                {selectedYear.format("YYYY")}
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignItems={{ xs: 'stretch', sm: 'center' }}
                justifyContent="space-between"
                spacing={2}
              >
                <Button variant="outlined" onClick={handleTodayClick} sx={{ maxWidth: 160 }}>
                  Today
                </Button>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                >
                  <IconButton onClick={handlePreviousYearClick} sx={{ maxWidth: 160 }}>
                    <KeyboardArrowLeftIcon />
                  </IconButton>
                  <IconButton onClick={handleNextYearClick} sx={{ maxWidth: 160 }}>
                    <KeyboardArrowRightIcon />
                  </IconButton>
                </Stack>
                <TodoActionGroup activeViewTitle="Year" />
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <TimelineYear todos={todos} selectedYear={selectedYear} handleTodoChange={handleTodoChange} handleMonthChange={handleMonthChange} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
