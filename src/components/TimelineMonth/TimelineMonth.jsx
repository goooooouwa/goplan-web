import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import { isInMonthRange, nthWeekOfMonth } from 'utils/rangeCheck';
import moment from 'moment';
import React from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import SHARED_PROP_TYPES from 'utils/sharedPropTypes';
import TodoMonthSlider from '../TodoMonthSlider/TodoMonthSlider';

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
  const params = useParams();
  const weekUrlPrefix = params.projectId !== undefined ? `/projects/${params.projectId}/week?week=` : '/timeline/week?week=';

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
            Todos
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
                    to={`${weekUrlPrefix}${props.selectedMonth.clone().add(mark.value - 1, "weeks").add(1, "days").format("YYYY[W]WW")}`}
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
        {props.todos
          .filter((todo) => {
            return todo.dependencies.length === 0;
          })
          .map((todo, index) => (
            <TodoMonthSlider key={index} todo={todo} marks={marks} selectedMonth={props.selectedMonth} handleTodoChange={props.handleTodoChange} handleWeekChange={props.handleWeekChange} />
          ))}
      </Grid>
    </>
  );
}

TimelineMonth.propTypes = {
  selectedMonth: momentPropTypes.momentObj.isRequired,
  todos: PropTypes.arrayOf(SHARED_PROP_TYPES.todo).isRequired,
  handleTodoChange: PropTypes.func.isRequired,
  handleWeekChange: PropTypes.func.isRequired
};