import React, { useEffect } from "react";
import { useParams, useSearchParams, useOutletContext } from "react-router-dom";
import { Button, Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import moment from "moment";
import TimelineMonth from "components/TimelineMonth/TimelineMonth";
import TodoActionGroup from "components/TodoActionGroup";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { isInMonthRange } from "utils/rangeCheck";
import { useTranslation } from 'react-i18next';

export default function TimelineMonthContainer() {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedMonth = searchParams.get("month") !== null ? moment(searchParams.get("month")) : moment().startOf("month");
  const todosUrl = params.projectId !== undefined ? `/todos.json?project_id=${params.projectId}&month=${selectedMonth.format("YYYY-MM-DD")}` : `/todos.json?month=${selectedMonth.format("YYYY-MM-DD")}`;
  const [todos, updateTodoStartEndDate, updateTodoStatus, loadChildren, reloadTodos] = useOutletContext();

  const handleTodayClick = (event) => {
    setSearchParams({ month: moment().startOf("month").format("YYYY-MM-DD") });
  }

  const handlePreviousMonthClick = (event) => {
    setSearchParams({ month: selectedMonth.clone().subtract(1, "months").format("YYYY-MM-DD") });
  }

  const handleNextMonthClick = (event) => {
    setSearchParams({ month: selectedMonth.clone().add(1, "months").format("YYYY-MM-DD") });
  }

  const handleWeekChange = (todo, weeks) => {
    const startDate = (todo.startDate !== null) ? moment(todo.startDate) : moment();
    const endDate = (todo.endDate !== null) ? moment(todo.endDate) : moment();

    if (!isInMonthRange(startDate, selectedMonth) && !isInMonthRange(endDate, selectedMonth)) {
      return;
    }

    let todoData = {};

    if (isInMonthRange(startDate, selectedMonth)) {
      todoData.start_date = startDate.week(startDate.clone().date(1).week() + weeks[0] - 1).toISOString();
    }

    if (isInMonthRange(endDate, selectedMonth)) {
      todoData.end_date = endDate.week(endDate.clone().date(1).week() + weeks[1] - 1).toISOString();
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
            <TimelineMonth todos={todos} selectedMonth={selectedMonth} handleTodoChange={handleTodoChange} handleWeekChange={handleWeekChange} loadChildren={loadChildren} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
