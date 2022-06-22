import { Grid } from '@mui/material';
import { isInWeekRange } from 'utils/rangeCheck';
import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import SHARED_PROP_TYPES from 'utils/sharedPropTypes';
import TimelineSlider from 'components/TimelineSlider/TimelineSlider';
import TodoItem from 'components/TodoItem/TodoItem';

const rangeMin = 0;
const rangeMax = 6;

export default function TodoWeekSlider(props) {
  const startDate = (props.todo.startDate !== null) ? moment(props.todo.startDate) : moment();
  const endDate = (props.todo.endDate !== null) ? moment(props.todo.endDate) : moment();

  const rangeMark = (date) => {
    if (date.isValid()) {
      let rangeMark;
      if (date.isBefore(props.selectedWeek.clone().startOf("week"))) {
        rangeMark = rangeMin;
      } else if (date.isAfter(props.selectedWeek.clone().endOf("week"))) {
        rangeMark = rangeMax;
      } else {
        rangeMark = date.day();
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
        <TimelineSlider
          marks={props.marks}
          rangeMin={rangeMin}
          rangeMax={rangeMax}
          rangeStart={rangeMark(startDate)}
          rangeEnd={rangeMark(endDate)}
          disableRangeStart={!isInWeekRange(startDate, props.selectedWeek)}
          disableRangeEnd={!isInWeekRange(endDate, props.selectedWeek)}
          handleChangeCommited={(newValue)=>{props.handleDayChange(props.todo, newValue)}}
        />
      </Grid>
    </>
  );
}

TodoWeekSlider.propTypes = {
  selectedWeek: momentPropTypes.momentObj.isRequired,
  marks: SHARED_PROP_TYPES.marks,
  todo: SHARED_PROP_TYPES.todo,
  handleTodoChange: PropTypes.func.isRequired,
  handleDayChange: PropTypes.func.isRequired
};