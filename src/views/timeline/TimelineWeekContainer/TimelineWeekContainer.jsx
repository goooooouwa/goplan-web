import React, { useEffect, useState } from "react";
import httpService from "services/httpService";
import { useParams, useSearchParams } from "react-router-dom";
import { Button, Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import moment from "moment";
import TimelineWeek from "components/TimelineWeek/TimelineWeek";
import TodoActionGroup from "components/TodoActionGroup";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { isInWeekRange } from "utils/rangeCheck";
import todoTraversal from "utils/todoTraversal";
import { useAPIError } from "hooks/useAPIError";
import { cloneDeep } from "lodash";
import { useTranslation } from 'react-i18next';
import { useLoading } from "hooks/useLoading";

export default function TimelineWeekContainer() {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const todosUrl = params.projectId !== undefined ? `/todos/children.json?project_id=${params.projectId}` : '/todos/children.json';
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedWeek = searchParams.get("week") !== null ? moment(searchParams.get("week")) : moment().startOf("week");
  const [todos, setTodos] = useState([]);
  const todosInJSON = JSON.stringify(todos);
  const { addError } = useAPIError();
  const { startLoading, finishLoading } = useLoading();

  const handleTodayClick = (event) => {
    setSearchParams({ week: moment().format("YYYY[W]WW") });
  }

  const handlePreviousWeekClick = (event) => {
    setSearchParams({ week: selectedWeek.clone().subtract(1, "weeks").format("YYYY[W]WW") });
  }

  const handleNextWeekClick = (event) => {
    setSearchParams({ week: selectedWeek.clone().add(1, "weeks").format("YYYY[W]WW") });
  }

  const handleDayChange = (todo, days) => {
    const startDate = (todo.startDate !== null) ? moment(todo.startDate) : moment();
    const endDate = (todo.endDate !== null) ? moment(todo.endDate) : moment();

    const todoData = {};

    if (isInWeekRange(startDate, selectedWeek)) {
      todoData.start_date = startDate.day(days[0]).toISOString();
    }

    if (isInWeekRange(endDate, selectedWeek)) {
      todoData.end_date = endDate.day(days[1]).toISOString();
    }

    startLoading();
    httpService.put(`/todos/${todo.id}.json`, todoData)
      .then((response) => {
        setTodos((todos) => {
          return todoTraversal.updateTodosAndChildren(todos, response.data);
        });
      })
      .catch(function (error) {
        let updatedTodo = cloneDeep(todo);
        updatedTodo.startDate = todoData.start_date || todo.startDate;
        updatedTodo.endDate = todoData.end_date || todo.endDate;
        setTodos((todos) => {
          return todoTraversal.updateTodosAndChildren(todos, updatedTodo);
        });
        addError(error.response.data, error.response.status);
        console.log(error);
      })
      .then(() => {
        finishLoading();
      });
  }

  const handleTodoChange = (event, todo) => {
    const todoData = {
      status: event.target.checked,
    };

    httpService.put(`/todos/${todo.id}.json`, todoData)
      .then((response) => {
        setTodos((todos) => {
          return todoTraversal.updateTodosAndChildren(todos, response.data);
        });
      })
      .catch(function (error) {
        addError(error.response.data, error.response.status);
        console.log(error);
      });
  };

  useEffect(() => {
    startLoading();
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
        finishLoading();
      });
  }, [todosUrl, todosInJSON, addError]);

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
                {selectedWeek.format("MMMM, YYYY")}
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignItems={{ xs: 'stretch', sm: 'center' }}
                justifyContent="space-between"
                spacing={2}
              >
                <Button variant="outlined" onClick={handleTodayClick} sx={{ maxWidth: 160 }}>
                  {t("Today")}
                </Button>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                >
                  <IconButton onClick={handlePreviousWeekClick} sx={{ maxWidth: 160 }}>
                    <KeyboardArrowLeftIcon />
                  </IconButton>
                  <IconButton onClick={handleNextWeekClick} sx={{ maxWidth: 160 }}>
                    <KeyboardArrowRightIcon />
                  </IconButton>
                </Stack>
                <TodoActionGroup activeViewTitle={t("Week")} />
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <TimelineWeek todos={todos} selectedWeek={selectedWeek} handleTodoChange={handleTodoChange} handleDayChange={handleDayChange} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
