import React, { useEffect } from "react";
import { useParams, useSearchParams, useOutletContext } from "react-router-dom";
import { Button, Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import moment from "moment";
import TimelineWeek from "components/TimelineWeek/TimelineWeek";
import TodoActionGroup from "components/TodoActionGroup";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { isInWeekRange } from "utils/rangeCheck";
import { useTranslation } from 'react-i18next';

export default function TimelineWeekContainer() {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedWeek = searchParams.get("week") !== null ? moment(searchParams.get("week")) : moment().startOf("week");
  const todosUrl = params.projectId !== undefined ? `/todos.json?project_id=${params.projectId}&week=${selectedWeek.format("YYYY-MM-DD")}` : `/todos.json?week=${selectedWeek.format("YYYY-MM-DD")}`;
  const [todos, updateTodoStartEndDate, updateTodoStatus, loadChildren, reloadTodos] = useOutletContext();

  const handleTodayClick = (event) => {
    setSearchParams({ week: moment().startOf("week").format("YYYY-MM-DD") });
  }

  const handlePreviousWeekClick = (event) => {
    setSearchParams({ week: selectedWeek.clone().subtract(1, "weeks").format("YYYY-MM-DD") });
  }

  const handleNextWeekClick = (event) => {
    setSearchParams({ week: selectedWeek.clone().add(1, "weeks").format("YYYY-MM-DD") });
  }

  const handleDayChange = (todo, days) => {
    const startDate = (todo.startDate !== null) ? moment(todo.startDate) : moment();
    const endDate = (todo.endDate !== null) ? moment(todo.endDate) : moment();

    if (!isInWeekRange(startDate, selectedWeek) && !isInWeekRange(endDate, selectedWeek)) {
      return;
    }

    const todoData = {};

    if (isInWeekRange(startDate, selectedWeek)) {
      todoData.start_date = startDate.day(days[0]).toISOString();
    }

    if (isInWeekRange(endDate, selectedWeek)) {
      todoData.end_date = endDate.day(days[1]).toISOString();
    }

    updateTodoStartEndDate(todo, todoData, () => (reloadTodos(todosUrl)));
  }

  const handleTodoChange = (event, todo) => {
    updateTodoStatus(event, todo, () => (reloadTodos(todosUrl)));
  };
  
  useEffect(() => {
    reloadTodos(todosUrl);
  }, [todosUrl]);

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
            <TimelineWeek todos={todos} selectedWeek={selectedWeek} handleTodoChange={handleTodoChange} handleDayChange={handleDayChange} loadChildren={loadChildren} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
