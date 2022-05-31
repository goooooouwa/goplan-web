import React, { useEffect, useState } from "react";
import httpService from "httpService";
import { useParams, useSearchParams } from "react-router-dom";
import { Button, Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import moment from "moment";
import TimelineMonth from "components/TimelineMonth";
import TodoActionGroup from "components/TodoActionGroup";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function TimelineMonthContainer() {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [todos, setTodos] = useState([]);
  const selectedMonth = searchParams.get("month") !== null ? moment(searchParams.get("month")) : moment().startOf("month");

  const handleTodayClick = (event) => {
    setSearchParams({ month: moment().format("YYYYMM") });
  }

  const handlePreviousMonthClick = (event) => {
    setSearchParams({ month: selectedMonth.clone().subtract(1, "months").format("YYYYMM") });
  }

  const handleNextMonthClick = (event) => {
    setSearchParams({ month: selectedMonth.clone().add(1, "months").format("YYYYMM") });
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
                {selectedMonth.format("MMMM, YYYY")}
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
                  <IconButton onClick={handlePreviousMonthClick} sx={{ maxWidth: 160 }}>
                    <KeyboardArrowLeftIcon />
                  </IconButton>
                  <IconButton onClick={handleNextMonthClick} sx={{ maxWidth: 160 }}>
                    <KeyboardArrowRightIcon />
                  </IconButton>
                </Stack>
                <TodoActionGroup activeViewTitle="Month" />
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <TimelineMonth todos={todos} selectedMonth={selectedMonth} handleTodoChange={handleTodoChange}/>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
