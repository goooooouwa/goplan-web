import { Grid } from '@mui/material';
import isInYearRange from 'utils/rangeCheck';
import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import SHARED_PROP_TYPES from 'utils/sharedPropTypes';
import TimelineRangeSlider from 'components/TimelineRangeSlider/TimelineRangeSlider';
import TodoItem from 'components/TodoItem/TodoItem';
import TimelineSlider from 'components/TimelineSlider/TimelineSlider';

const rangeMin = 0;
const rangeMax = 11;

export default function TodoYearSlider(props) {
  const startDate = (props.todo.startDate !== null) ? moment(props.todo.startDate) : moment();
  const endDate = (props.todo.endDate !== null) ? moment(props.todo.endDate) : moment();

  const rangeMark = (date) => {
    if (date.isValid()) {
      let rangeMark;
      if (date.isBefore(props.selectedYear.clone().startOf("year"))) {
        rangeMark = rangeMin;
      } else if (date.isAfter(props.selectedYear.clone().endOf("year"))) {
        rangeMark = rangeMax;
      } else {
        rangeMark = date.month();
      }
      return rangeMark;
    } else {
      return -1;
    }
  };

  return (
    <>
      <Grid item xs={12} md={4}>
        <TodoItem todo={props.todo} handleTodoChange={props.handleTodoChange}/>
      </Grid>
      <Grid item xs={12} md={8} sx={{ px: 3 }}>
        {props.todo.repeat &&
          <TimelineRangeSlider
            marks={props.marks}
            rangeMin={rangeMin}
            rangeMax={rangeMax}
            rangeStart={rangeMark(startDate)}
            rangeEnd={rangeMark(endDate)}
            disableRangeStart={!isInYearRange(startDate, props.selectedYear)}
            disableRangeEnd={!isInYearRange(endDate, props.selectedYear)}
            handleChangeCommited={(newValue) => { props.handleMonthChange(props.todo, newValue) }}
          />
        }
        {!props.todo.repeat &&
          <TimelineSlider
            marks={props.marks}
            rangeMin={rangeMin}
            rangeMax={rangeMax}
            rangeStart={rangeMark(startDate)}
            disableRangeStart={!isInYearRange(startDate, props.selectedYear)}
            handleChangeCommited={(newValue) => { props.handleMonthChange(props.todo, newValue) }}
          />
        }
      </Grid>
    </>
  );
}

TodoYearSlider.propTypes = {
  selectedYear: momentPropTypes.momentObj.isRequired,
  marks: SHARED_PROP_TYPES.marks,
  todo: SHARED_PROP_TYPES.todo,
  handleTodoChange: PropTypes.func.isRequired,
  handleMonthChange: PropTypes.func.isRequired
};