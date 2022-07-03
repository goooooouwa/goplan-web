import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import { isInQuarterRange } from 'utils/rangeCheck';
import moment from 'moment';
import React from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import SHARED_PROP_TYPES from 'utils/sharedPropTypes';
import TodoQuarterSlider from '../TodoQuarterSlider/TodoQuarterSlider';

const marks = [
  {
    value: 0,
  },
  {
    value: 1,
  },
  {
    value: 2,
  },
];

export default function TimelineQuarter(props) {
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
          <Box m={1}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {marks.map((mark, index) => (
                <Stack key={index}>
                  <IconButton
                    key={index}
                    component={RouterLink}
                    size="small"
                    to={`${monthUrlPrefix}${props.selectedQuarter.clone().add(mark.value, "months").format("YYYYMM")}`}
                    sx={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      color: (isInQuarterRange(moment(), props.selectedQuarter) && (moment().month() % 3 === index)) ? 'error.main' : 'text.primary'
                    }}
                  >
                    {`${props.selectedQuarter.clone().add(mark.value, "months").startOf("month").format("MMM")}`}
                  </IconButton>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Grid>
        {props.todos
          .map((todo, index) => (
            <TodoQuarterSlider key={index} todo={todo} selectedQuarter={props.selectedQuarter} handleTodoChange={props.handleTodoChange} handleMonthChange={props.handleMonthChange} />
          ))}
      </Grid>
    </>
  );
}

TimelineQuarter.propTypes = {
  selectedQuarter: momentPropTypes.momentObj.isRequired,
  todos: PropTypes.arrayOf(SHARED_PROP_TYPES.todo).isRequired,
  handleTodoChange: PropTypes.func.isRequired,
  handleMonthChange: PropTypes.func.isRequired
};