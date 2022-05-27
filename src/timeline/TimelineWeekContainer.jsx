import React, { useEffect, useState } from "react";
import httpService from "httpService";
import { useParams, Link as RouterLink, useSearchParams } from "react-router-dom";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import moment from "moment";
import TimelineWeek from "components/TimelineWeek";

export default function TimelineWeekContainer() {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [todos, setTodos] = useState([]);
  const selectedWeek = searchParams.get("week") !== null ? moment(searchParams.get("week")) : moment();
  const todoListUrl = params.projectId !== undefined ? `/projects/${params.projectId}/todos` : '/todos';
  const newTodoUrl = params.projectId !== undefined ? `/projects/${params.projectId}/todos/new` : '/todos/new';

  const handleTodayClick = (event) => {
    setSearchParams({week: moment().format("YYYY[W]WW")});
  }

  const handlePreviousWeekClick = (event) => {
    setSearchParams({week: selectedWeek.clone().subtract(1, "weeks").format("YYYY[W]WW")});
  }

  const handleNextWeekClick = (event) => {
    setSearchParams({week: selectedWeek.clone().add(1, "weeks").format("YYYY[W]WW")});
  }

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
                {selectedWeek.format("MMMM, YYYY")}
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignItems={{ xs: 'stretch', sm: 'baseline' }}
                justifyContent="space-between"
                spacing={2}
              >
                <Button variant="outlined" onClick={handleTodayClick} sx={{ maxWidth: 160 }}>
                  Today
                </Button>
                <Button variant="outlined" onClick={handlePreviousWeekClick} sx={{ maxWidth: 160 }}>
                  {"<"}
                </Button>
                <Button variant="outlined" onClick={handleNextWeekClick} sx={{ maxWidth: 160 }}>
                  {">"}
                </Button>
                <Button variant="contained" component={RouterLink} to={newTodoUrl} sx={{ maxWidth: 160 }}>
                  New Todo
                </Button>
                <Button variant="outlined" component={RouterLink} to={todoListUrl} sx={{ maxWidth: 160 }}>
                  Todos
                </Button>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <TimelineWeek todos={todos} selectedWeek={selectedWeek} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
