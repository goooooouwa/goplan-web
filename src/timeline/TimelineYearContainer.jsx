import React, { useEffect, useState } from "react";
import httpService from "httpService";
import TimelineYear from "components/TimelineYear";
import { useParams, useSearchParams } from "react-router-dom";
import { Button, Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import moment from "moment";
import TodoActionGroup from "components/TodoActionGroup";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import isInYearRange from 'lib/rangeCheck';

export default function TimelineYearContainer() {
  const params = useParams();
  const todosUrl = params.projectId !== undefined ? `/todos.json/?project_id=${params.projectId}` : '/todos.json';
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedYear = searchParams.get("year") !== null ? moment(searchParams.get("year")) : moment().startOf("year");
  const [todos, setTodos] = useState([]);
  const todosInJSON = JSON.stringify(todos);

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

    const todoData = {
      project_id: todo.projectId,
      tarame: todo.name,
      description: todo.description,
      repeat: todo.repeat,
      repeat_period: todo.repeatPeriod,
      repeat_times: todo.repeatTimes,
      instance_time_span: todo.instanceTimeSpan
    };

    if (isInYearRange(startDate, selectedYear)) {
      todoData.start_date = startDate.month(months[0]).toISOString();
    }

    if (isInYearRange(endDate, selectedYear)) {
      todoData.end_date = endDate.month(months[1]).toISOString();
    }

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
  }

  const handleTodoChange = (event, todo) => {
    const todoData = {
      status: event.target.checked,
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

  useEffect(() => {
    httpService.get(todosUrl)
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
