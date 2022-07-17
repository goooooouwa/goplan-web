import { Box, Grid, Stack, Typography } from '@mui/material';
import { isInWeekRange } from 'utils/rangeCheck';
import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import TodoWeekSlider from '../TodoWeekSlider/TodoWeekSlider';
import SHARED_PROP_TYPES from 'utils/sharedPropTypes';

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

  const todosInRange = props.todos.filter(todo => (
    !(moment(todo.endDate).isBefore(props.selectedWeek, 'week') || moment(todo.startDate).isAfter(props.selectedWeek, 'week'))
  ));

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
            Tasks
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
        {todosInRange.map((todo, index) => (
          <TodoWeekSlider key={index} todo={todo} selectedWeek={props.selectedWeek} handleTodoChange={props.handleTodoChange} handleDayChange={props.handleDayChange} />
        ))}
        {todosInRange.length === 0 &&
          <Grid item xs={12}>
            <Stack alignItems="center" justifyContent="center" sx={{ height: 200 }}>
              <Typography alignItems="center">
                No tasks in selected time range
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
  handleDayChange: PropTypes.func.isRequired
};