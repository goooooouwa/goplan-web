import { Grid } from '@mui/material';
import httpService from 'httpService';
import { isInMonthRange } from 'lib/rangeCheck';
import moment from 'moment';
import React from 'react';
import SliderContainer from './SliderContainer';
import TodoItem from './TodoItem';

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

  function handleWeekChange(weeks) {
    let todoData = {
      project_id: props.todo.projectId,
      name: props.todo.name,
      description: props.todo.description,
      repeat: props.todo.repeat,
      repeat_period: props.todo.repeatPeriod,
      repeat_times: props.todo.repeatTimes,
      instance_time_span: props.todo.instanceTimeSpan
    };

    if (isInMonthRange(startDate, props.selectedMonth)) {
      todoData.start_date = startDate.week(startDate.date(1).week() + weeks[0] - 1).toISOString();
    }

    if (isInMonthRange(endDate, props.selectedMonth)) {
      todoData.end_date = endDate.week(endDate.date(1).week() + weeks[1] - 1).toISOString();
    }

    httpService.put(`/todos/${props.todo.id}.json`, todoData)
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <Grid item xs={12} md={4}>
        <TodoItem todo={props.todo} />
      </Grid>
      <Grid item xs={12} md={8} sx={{ px: 3 }}>
        <SliderContainer
          marks={props.marks}
          rangeMin={rangeMin}
          rangeMax={rangeMax}
          rangeStart={rangeMark(startDate)}
          rangeEnd={rangeMark(endDate)}
          disableRangeStart={!isInMonthRange(startDate, props.selectedMonth)}
          disableRangeEnd={!isInMonthRange(endDate, props.selectedMonth)}
          handleChange={handleWeekChange}
        />
      </Grid>
    </>
  );
}
