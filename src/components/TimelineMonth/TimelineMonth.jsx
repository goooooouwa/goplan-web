import { Box, Grid, IconButton, Stack, Typography, Link } from '@mui/material';
import { isInMonthRange, nthWeekOfMonth } from 'utils/rangeCheck';
import moment from 'moment';
import React, { Fragment } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import SHARED_PROP_TYPES from 'utils/sharedPropTypes';
import TodoMonthSlider from '../TodoMonthSlider/TodoMonthSlider';
import { useTranslation } from 'react-i18next';
import todoTraversal from 'utils/todoTraversal';

const marks = [
  {
    value: 1,
    label: 'Week 1',
  },
  {
    value: 2,
    label: 'Week 2',
  },
  {
    value: 3,
    label: 'Week 3',
  },
  {
    value: 4,
    label: 'Week 4',
  },
  {
    value: 5,
    label: 'Week 5',
  },
];

export default function TimelineMonth(props) {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const weekUrlPrefix = params.projectId !== undefined ? `/projects/${params.projectId}/timeline/week?week=` : '/timeline/week?week=';
  const todosByProject = todoTraversal.groupByProject(props.todos);

  return (
    <>
      <Grid container rowSpacing={1} >
        <Grid item xs={12} md={4}>
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              textAlign: 'left',
              mt: 1,
              ml: 2
            }}
          >
            {t('Tasks')}
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box m={1}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {marks.map((mark, index) => (
                <Stack key={index}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: (isInMonthRange(moment(), props.selectedMonth) && (nthWeekOfMonth(moment(), props.selectedMonth) === index + 1)) ? 'error.main' : 'text.primary'
                    }}
                  >
                    {mark.label}
                  </Typography>
                  <IconButton
                    key={index}
                    component={RouterLink}
                    size="small"
                    to={`${weekUrlPrefix}${props.selectedMonth.clone().add(mark.value - 1, "weeks").format("YYYY-MM-DD")}`}
                    sx={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      color: (isInMonthRange(moment(), props.selectedMonth) && (nthWeekOfMonth(moment(), props.selectedMonth) === index + 1)) ? 'error.main' : 'text.primary'
                    }}
                  >
                    {`${props.selectedMonth.clone().add(mark.value - 1, "weeks").startOf("week").format("D")} - ${props.selectedMonth.clone().add(mark.value - 1, "weeks").startOf("week").add(6, "days").format("D")}`}
                  </IconButton>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Grid>
        {Object.entries(todosByProject).map(([_, todos], index) => (
          <Fragment key={index}>
            {todos.length > 0 &&
              <Grid item xs={12}>
                <Link
                  component={RouterLink}
                  to={`/projects/${todos[0].project.id}/todos`}
                  underline="hover"
                  sx={{
                    fontWeight: 'bold',
                    color: 'text.secondary'
                  }}
                >
                  {t('Goal: ')}{todos[0].project.name}
                </Link>
              </Grid>
            }
            {todos.map((todo, index) => (
              <TodoMonthSlider key={todo.id} todo={todo} selectedMonth={props.selectedMonth} handleTodoChange={props.handleTodoChange} handleWeekChange={props.handleWeekChange} loadChildren={props.loadChildren} />
            ))}
          </Fragment>
        ))}
        {Object.keys(todosByProject).length === 0 &&
          <Grid item xs={12}>
            <Stack alignItems="center" justifyContent="center" sx={{ height: 200 }}>
              <Typography alignItems="center">
                {t('No tasks in selected time range')}
              </Typography>
            </Stack>
          </Grid>
        }
      </Grid>
    </>
  );
}

TimelineMonth.propTypes = {
  selectedMonth: momentPropTypes.momentObj.isRequired,
  todos: PropTypes.arrayOf(SHARED_PROP_TYPES.todo).isRequired,
  handleTodoChange: PropTypes.func.isRequired,
  loadChildren: PropTypes.func.isRequired,
  handleWeekChange: PropTypes.func.isRequired
};