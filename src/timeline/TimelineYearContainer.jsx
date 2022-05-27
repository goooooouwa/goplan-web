import React, { useEffect, useState } from "react";
import httpService from "httpService";
import TimelineYear from "components/TimelineYear";
import { useParams, Link as RouterLink, useSearchParams } from "react-router-dom";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import moment from "moment";

export default function TimelineYearContainer() {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [todos, setTodos] = useState([]);
  const selectedYear = searchParams.get("year") !== null ? moment(searchParams.get("year")) : moment();
  const todoListUrl = params.projectId !== undefined ? `/projects/${params.projectId}/todos` : '/todos';
  const newTodoUrl = params.projectId !== undefined ? `/projects/${params.projectId}/todos/new` : '/todos/new';

  const handleTodayClick = (event) => {
    setSearchParams({year: moment().format("YYYY")});
  }

  const handlePreviousYearClick = (event) => {
    setSearchParams({year: selectedYear.subtract(1, "years").format("YYYY")});
  }

  const handleNextYearClick = (event) => {
    setSearchParams({year: selectedYear.add(1, "years").format("YYYY")});
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
                  {selectedYear.format("YYYY")}
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
                <Button variant="outlined" onClick={handlePreviousYearClick} sx={{ maxWidth: 160 }}>
                  {"<"}
                </Button>
                <Button variant="outlined" onClick={handleNextYearClick} sx={{ maxWidth: 160 }}>
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
            <TimelineYear todos={todos} selectedYear={selectedYear} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
