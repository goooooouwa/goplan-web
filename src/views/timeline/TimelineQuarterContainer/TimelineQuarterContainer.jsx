import React, { useEffect, useState } from "react";
import httpService from "services/httpService";
import { useParams, useSearchParams } from "react-router-dom";
import { Button, Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import moment from "moment";
import TimelineQuarter from "components/TimelineQuarter/TimelineQuarter";
import TodoActionGroup from "components/TodoActionGroup";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { isInQuarterRange } from "utils/rangeCheck";
import todoTraversal from "utils/todoTraversal";
import { useAPIError } from "hooks/useAPIError";
import { cloneDeep } from "lodash";
import { useTranslation } from 'react-i18next';
import { useLoading } from "hooks/useLoading";

export default function TimelineQuarterContainer() {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const todosUrl = params.projectId !== undefined ? `/todos/children.json?project_id=${params.projectId}` : '/todos/children.json';
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedQuarter = searchParams.get("quarter") !== null ? moment(searchParams.get("quarter"), "YYYY[Q]Q") : moment().startOf("quarter");
  const [todos, setTodos] = useState([]);
  const todosInJSON = JSON.stringify(todos);
  const { addError } = useAPIError();
  const { startLoading, finishLoading } = useLoading();

  const handleTodayClick = (event) => {
    setSearchParams({ quarter: moment().format("YYYY[Q]Q") });
  }

  const handlePreviousQuarterClick = (event) => {
    setSearchParams({ quarter: selectedQuarter.clone().subtract(1, "quarters").format("YYYY[Q]Q") });
  }

  const handleNextQuarterClick = (event) => {
    setSearchParams({ quarter: selectedQuarter.clone().add(1, "quarters").format("YYYY[Q]Q") });
  }

  const handleMonthChange = (todo, months) => {
    const startDate = (todo.startDate !== null) ? moment(todo.startDate) : moment();
    const endDate = (todo.endDate !== null) ? moment(todo.endDate) : moment();

    if (!isInQuarterRange(startDate, selectedQuarter) && !isInQuarterRange(endDate, selectedQuarter)) {
      return;
    }

    let todoData = {};

    if (isInQuarterRange(startDate, selectedQuarter)) {
      todoData.start_date = startDate.month((selectedQuarter.quarter() - 1) * 3 + months[0]).toISOString();
    }

    if (isInQuarterRange(endDate, selectedQuarter)) {
      todoData.end_date = endDate.month((selectedQuarter.quarter() - 1) * 3 + months[1]).toISOString();
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
                {selectedQuarter.format("[Q]Q, YYYY")}
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
                  <IconButton onClick={handlePreviousQuarterClick} sx={{ maxWidth: 160 }}>
                    <KeyboardArrowLeftIcon />
                  </IconButton>
                  <IconButton onClick={handleNextQuarterClick} sx={{ maxWidth: 160 }}>
                    <KeyboardArrowRightIcon />
                  </IconButton>
                </Stack>
                <TodoActionGroup activeViewTitle={t("Quarter")} />
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <TimelineQuarter todos={todos} selectedQuarter={selectedQuarter} handleTodoChange={handleTodoChange} handleMonthChange={handleMonthChange} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
