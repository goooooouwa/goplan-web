import { Grid } from '@mui/material';
import { isInWeekRange } from 'utils/rangeCheck';
import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import TimelineSlider from 'components/TimelineSlider/TimelineSlider';
import TodoItem from 'components/TodoItem/TodoItem';

const rangeMin = 0;
const rangeMax = 6;

export default function TodoWeekSlider(props) {
  const startDate = (props.todo.startDate !== null) ? moment(props.todo.startDate) : moment();
  const endDate = (props.todo.endDate !== null) ? moment(props.todo.endDate) : moment();

  function rangeMark(date) {
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
  }

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
          disableRangeStart={!isInWeekRange(moment(), props.selectedWeek)}
          disableRangeEnd={!isInWeekRange(moment(), props.selectedWeek)}
          handleChangeCommited={(newValue)=>{props.handleDayChange(props.todo, newValue)}}
        />
      </Grid>
    </>
  );
}

TodoWeekSlider.propTypes = {
  selectedWeek: momentPropTypes.momentObj.isRequired,
  marks: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number
  })).isRequired,
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    projectId: PropTypes.number.isRequired,
    status: PropTypes.bool,
    name: PropTypes.string.isRequired,
    startDate: momentPropTypes.momentObj.isRequired,
    endDate: momentPropTypes.momentObj.isRequired,
      description: PropTypes.string,
      repeat: PropTypes.bool,
      repeat_period: PropTypes.string,
      repeat_times: PropTypes.number,
      instanceTimeSpan: PropTypes.number.isRequired,
      dependencies: PropTypes.array
  }).isRequired,
  handleTodoChange: PropTypes.func.isRequired,
  handleDayChange: PropTypes.func.isRequired
};