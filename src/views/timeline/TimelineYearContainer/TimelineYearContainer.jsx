import React, { useEffect } from "react";
import TimelineYear from "components/TimelineYear/TimelineYear";
import { useParams, useSearchParams, useOutletContext } from "react-router-dom";
import { Button, Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import moment from "moment";
import TodoActionGroup from "components/TodoActionGroup";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import isInYearRange from 'utils/rangeCheck';
import { useTranslation } from 'react-i18next';

export default function TimelineYearContainer() {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedYear = searchParams.get("year") !== null ? moment(searchParams.get("year")) : moment().startOf("year");
  const todosUrl = params.projectId !== undefined ? `/todos.json?root=true&project_id=${params.projectId}&year=${selectedYear.format("YYYY-MM-DD")}` : `/todos.json?root=true&year=${selectedYear.format("YYYY-MM-DD")}`;
  const [todos, updateTodoStartEndDate, updateTodoStatus, loadChildren, debouncedReloadTodos] = useOutletContext();

  const handleTodayClick = (event) => {
    setSearchParams({ year: moment().startOf("year").format("YYYY-MM-DD") });
  }

  const handlePreviousYearClick = (event) => {
    setSearchParams({ year: selectedYear.clone().subtract(1, "years").format("YYYY-MM-DD") });
  }

  const handleNextYearClick = (event) => {
    setSearchParams({ year: selectedYear.clone().add(1, "years").format("YYYY-MM-DD") });
  }

  const handleMonthChange = (todo, months) => {
    const startDate = (todo.startDate !== null) ? moment(todo.startDate) : moment();
    const endDate = (todo.endDate !== null) ? moment(todo.endDate) : moment();

    if (!isInYearRange(startDate, selectedYear) && !isInYearRange(endDate, selectedYear)) {
      return;
    }

    const todoData = {};

    if (isInYearRange(startDate, selectedYear)) {
      todoData.start_date = startDate.month(months[0]).toISOString();
    }

    if (isInYearRange(endDate, selectedYear)) {
      todoData.end_date = endDate.month(months[1]).toISOString();
    }

    updateTodoStartEndDate(todo, todoData, () => (debouncedReloadTodos(todosUrl)));
  }

  const handleTodoChange = (event, todo) => {
    updateTodoStatus(event, todo, () => (debouncedReloadTodos(todosUrl)));
  };

  useEffect(() => {
    debouncedReloadTodos(todosUrl);
  }, [todosUrl]);

  return (
    <>
      <Container sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h4" component="div">
                {selectedYear.format("YYYY")}
              </Typography>
              <Stack
                direction="row"
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
                  <IconButton onClick={handlePreviousYearClick} sx={{ maxWidth: 160 }}>
                    <KeyboardArrowLeftIcon />
                  </IconButton>
                  <IconButton onClick={handleNextYearClick} sx={{ maxWidth: 160 }}>
                    <KeyboardArrowRightIcon />
                  </IconButton>
                </Stack>
                <TodoActionGroup activeViewTitle={t("Year")} />
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <TimelineYear todos={todos} selectedYear={selectedYear} handleTodoChange={handleTodoChange} handleMonthChange={handleMonthChange} loadChildren={loadChildren} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
