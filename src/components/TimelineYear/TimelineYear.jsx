import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import isInYearRange from 'utils/rangeCheck';
import moment from 'moment';
import React from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import SHARED_PROP_TYPES from 'utils/sharedPropTypes';
import TodoYearSlider from '../TodoYearSlider/TodoYearSlider';

const marks = [
  {
    value: 0,
    label: 'Jan',
  },
  {
    value: 1,
    label: 'Feb',
  },
  {
    value: 2,
    label: 'Mar',
  },
  {
    value: 3,
    label: 'Apr',
  },
  {
    value: 4,
    label: 'May',
  },
  {
    value: 5,
    label: 'Jun',
  },
  {
    value: 6,
    label: 'Jul',
  },
  {
    value: 7,
    label: 'Aug',
  },
  {
    value: 8,
    label: 'Sep',
  },
  {
    value: 9,
    label: 'Oct',
  },
  {
    value: 10,
    label: 'Nov',
  },
  {
    value: 11,
    label: 'Dec',
  },
];

export default function TimelineYear(props) {
  const params = useParams();
  const monthUrlPrefix = params.projectId !== undefined ? `/projects/${params.projectId}/month?month=` : '/timeline/month?month=';

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
          <Box display='block' m={1}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {marks.map((mark, index) => (
                <IconButton
                  key={index}
                  component={RouterLink}
                  size="small"
                  to={`${monthUrlPrefix}${props.selectedYear.clone().add(mark.value, "months").format("YYYYMM")}`}
                  sx={{
                    fontWeight: 'bold',
                    fontSize: { xs: 10, sm: 16 },
                    color: (isInYearRange(moment(), props.selectedYear) && moment().month() === index) ? 'error.main' : 'text.primary'
                  }}
                >
                  {mark.label}
                </IconButton>
              ))}
            </Stack>
          </Box>
        </Grid>
        {props.todos
          .map((todo, index) => (
            <TodoYearSlider key={index} todo={todo} selectedYear={props.selectedYear} handleTodoChange={props.handleTodoChange} handleMonthChange={props.handleMonthChange} />
          ))}
      </Grid>
    </>
  );
}

TimelineYear.propTypes = {
  selectedYear: momentPropTypes.momentObj.isRequired,
  todos: PropTypes.arrayOf(SHARED_PROP_TYPES.todo).isRequired,
  handleTodoChange: PropTypes.func.isRequired,
  handleMonthChange: PropTypes.func.isRequired
};