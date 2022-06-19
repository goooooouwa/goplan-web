import { Grid } from '@mui/material';
import { isInMonthRange } from 'lib/rangeCheck';
import moment from 'moment';
import React from 'react';
import TimelineSlider from './TimelineSlider/TimelineSlider';
import TodoItem from './TodoItem/TodoItem';

const rangeMin = 1;
const rangeMax = 5;

export default function TodoMonthSlider(props) {
  const startDate = (props.todo.startDate !== null) ? moment(props.todo.startDate) : moment();
  const endDate = (props.todo.endDate !== null) ? moment(props.todo.endDate) : moment();

  const rangeMark = (date) => {
    if (date.isValid()) {
      let rangeMark;
      if (date.isBefore(props.selectedMonth.clone().startOf("month"))) {
        rangeMark = rangeMin;
      } else if (date.isAfter(props.selectedMonth.clone().endOf("month"))) {
        rangeMark = rangeMax;
      } else {
        rangeMark = Math.ceil(date.date() / 7);
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
          disableRangeStart={!isInMonthRange(startDate, props.selectedMonth)}
          disableRangeEnd={!isInMonthRange(endDate, props.selectedMonth)}
          handleChangeCommited={(newValue)=>{props.handleWeekChange(props.todo, newValue)}}
        />
      </Grid>
    </>
  );
}
