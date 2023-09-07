import { Box, Grid, Link, Stack, Typography } from '@mui/material';
import { isInWeekRange } from 'utils/rangeCheck';
import moment from 'moment';
import React, { Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import TodoWeekSlider from '../TodoWeekSlider/TodoWeekSlider';
import SHARED_PROP_TYPES from 'utils/sharedPropTypes';
import { useTranslation } from 'react-i18next';
import todoTraversal from 'utils/todoTraversal';

const marks = [
  {
    value: 0,
    label: 'Sun',
  },
  {
    value: 1,
    label: 'Mon',
  },
  {
    value: 2,
    label: 'Tue',
  },
  {
    value: 3,
    label: 'Wed',
  },
  {
    value: 4,
    label: 'Thu',
  },
  {
    value: 5,
    label: 'Fri',
  },
  {
    value: 6,
    label: 'Sat',
  },
];

export default function TimelineWeek(props) {
  const { t, i18n } = useTranslation();
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
                      color: (isInWeekRange(moment(), props.selectedWeek) && moment().day() === index) ? 'error.main' : 'text.primary'
                    }}
                  >
                    {mark.label}
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{
                      fontWeight: 'bold',
                      color: (isInWeekRange(moment(), props.selectedWeek) && moment().day() === index) ? 'error.main' : 'text.primary'
                    }}
                  >
                    {props.selectedWeek.startOf("week").add(mark.value, "days").format("D")}
                  </Typography>
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
              <TodoWeekSlider key={todo.id} todo={todo} selectedWeek={props.selectedWeek} handleTodoChange={props.handleTodoChange} handleDayChange={props.handleDayChange} loadChildren={props.loadChildren} />
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

TimelineWeek.propTypes = {
  selectedWeek: momentPropTypes.momentObj.isRequired,
  todos: PropTypes.arrayOf(SHARED_PROP_TYPES.todo).isRequired,
  handleTodoChange: PropTypes.func.isRequired,
  loadChildren: PropTypes.func.isRequired,
  handleDayChange: PropTypes.func.isRequired
};