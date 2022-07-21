import React, { useEffect, useState } from "react";
import httpService from "services/httpService";
import { useParams, useSearchParams } from "react-router-dom";
import { Button, Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import moment from "moment";
import TimelineMonth from "components/TimelineMonth/TimelineMonth";
import TodoActionGroup from "components/TodoActionGroup";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { isInMonthRange } from "utils/rangeCheck";
import todoTraversal from "utils/todoTraversal";
import { useAPIError } from "hooks/useAPIError";
import { cloneDeep } from "lodash";
import { useTranslation } from 'react-i18next';

export default function TimelineMonthContainer() {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const todosUrl = params.projectId !== undefined ? `/todos/children.json?project_id=${params.projectId}` : '/todos/children.json';
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedMonth = searchParams.get("month") !== null ? moment(searchParams.get("month")) : moment().startOf("month");
  const [todos, setTodos] = useState([]);
  const todosInJSON = JSON.stringify(todos);
  const { addError } = useAPIError();

  const handleTodayClick = (event) => {
    setSearchParams({ month: moment().format("YYYYMM") });
  }

  const handlePreviousMonthClick = (event) => {
    setSearchParams({ month: selectedMonth.clone().subtract(1, "months").format("YYYYMM") });
  }

  const handleNextMonthClick = (event) => {
    setSearchParams({ month: selectedMonth.clone().add(1, "months").format("YYYYMM") });
  }

  const handleWeekChange = (todo, weeks) => {
    const startDate = (todo.startDate !== null) ? moment(todo.startDate) : moment();
    const endDate = (todo.endDate !== null) ? moment(todo.endDate) : moment();

    let todoData = {};

    if (isInMonthRange(startDate, selectedMonth)) {
      todoData.start_date = startDate.week(startDate.date(1).week() + weeks[0] - 1).toISOString();
    }

    if (isInMonthRange(endDate, selectedMonth)) {
      todoData.end_date = endDate.week(endDate.date(1).week() + weeks[1] - 1).toISOString();
    }

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
                {selectedMonth.format("MMMM, YYYY")}
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
                  <IconButton onClick={handlePreviousMonthClick} sx={{ maxWidth: 160 }}>
                    <KeyboardArrowLeftIcon />
                  </IconButton>
                  <IconButton onClick={handleNextMonthClick} sx={{ maxWidth: 160 }}>
                    <KeyboardArrowRightIcon />
                  </IconButton>
                </Stack>
                <TodoActionGroup activeViewTitle={t("Month")} />
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <TimelineMonth todos={todos} selectedMonth={selectedMonth} handleTodoChange={handleTodoChange} handleWeekChange={handleWeekChange} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
