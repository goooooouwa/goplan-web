import React, { useEffect } from "react";
import { useParams, useSearchParams, useOutletContext } from "react-router-dom";
import { Button, Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import moment from "moment";
import TimelineQuarter from "components/TimelineQuarter/TimelineQuarter";
import TodoActionGroup from "components/TodoActionGroup";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { isInQuarterRange } from "utils/rangeCheck";
import { useTranslation } from 'react-i18next';

export default function TimelineQuarterContainer() {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedQuarter = searchParams.get("quarter") !== null ? moment(searchParams.get("quarter"), "YYYY-MM-DD") : moment().startOf("quarter");
  const todosUrl = params.projectId !== undefined ? `/todos.json?root=true&project_id=${params.projectId}&quarter=${selectedQuarter.format("YYYY-MM-DD")}` : `/todos.json?root=true&quarter=${selectedQuarter.format("YYYY-MM-DD")}`;
  const [todos, updateTodoStartEndDate, updateTodoStatus, loadChildren, debouncedReloadTodos] = useOutletContext();

  const handleTodayClick = (event) => {
    setSearchParams({ quarter: moment().startOf("quarter").format("YYYY-MM-DD") });
  }

  const handlePreviousQuarterClick = (event) => {
    setSearchParams({ quarter: selectedQuarter.clone().subtract(1, "quarters").format("YYYY-MM-DD") });
  }

  const handleNextQuarterClick = (event) => {
    setSearchParams({ quarter: selectedQuarter.clone().add(1, "quarters").format("YYYY-MM-DD") });
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
              spacing={1}
            >
              <Typography variant="h4" component="div">
                {selectedQuarter.format("[Q]Q, YYYY")}
              </Typography>
              <Stack
                direction="row"
                alignItems={{ xs: 'stretch', sm: 'center' }}
                justifyContent="space-between"
                spacing={1}
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
            <TimelineQuarter todos={todos} selectedQuarter={selectedQuarter} handleTodoChange={handleTodoChange} handleMonthChange={handleMonthChange} loadChildren={loadChildren} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
