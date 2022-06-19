import { Grid } from '@mui/material';
import isInYearRange from 'lib/rangeCheck';
import moment from 'moment';
import React from 'react';
import TimelineSlider from './TimelineSlider/TimelineSlider';
import TodoItem from './TodoItem/TodoItem';

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
        <TimelineSlider
          marks={props.marks}
          rangeMin={rangeMin}
          rangeMax={rangeMax}
          rangeStart={rangeMark(startDate)}
          rangeEnd={rangeMark(endDate)}
          disableRangeStart={!isInYearRange(startDate, props.selectedYear)}
          disableRangeEnd={!isInYearRange(endDate, props.selectedYear)}
          handleChangeCommited={(newValue)=>{props.handleMonthChange(props.todo, newValue)}}
        />
      </Grid>
    </>
  );
}
