import { Grid } from '@mui/material';
import httpService from 'httpService';
import { isInMonthRange } from 'lib/rangeCheck';
import { calculatedEndDate } from 'lib/timeLeft';
import moment from 'moment';
import React, { useState } from 'react';
import SliderContainer from './SliderContainer';
import TodoItem from './TodoItem';

const rangeMin = 0;
const rangeMax = 4;

export default function TodoMonthSlider(props) {
  const [startDate, setStartDate] = useState((props.todo.startDate !== null) ? moment(props.todo.startDate) : moment());
  const [endDate, setEndDate] = useState((props.todo.endDate !== null) ? moment(props.todo.endDate) : calculatedEndDate(props.todo.startDate, props.todo.timeSpan));

  const rangeMark = (date) => {
    if (date.isValid()) {
      let rangeMark;
      if (date.isBefore(props.selectedMonth.clone().startOf("month"))) {
        rangeMark = rangeMin;
      } else if (date.isAfter(props.selectedMonth.clone().endOf("month"))) {
        rangeMark = rangeMax;
      } else {
        rangeMark = Math.ceil(date.date() / 7) - 1;
      }
      return rangeMark;
    } else {
      return -1;
    }
  };

  function handleWeekChange(weeks) {
    const [newStartWeek, newEndWeek] = weeks;
    const todoData = {
      project_id: props.todo.projectId,
      name: props.todo.name,
      description: props.todo.description,
      time_span: props.todo.timeSpan,
      start_date: startDate.week(startDate.date(1).week() + newStartWeek).toISOString(),
      end_date: endDate.week(endDate.date(1).week() + newEndWeek).toISOString(),
      repeat: props.todo.repeat,
      repeat_period: props.todo.repeatPeriod,
      repeat_times: props.todo.repeatTimes,
      instance_time_span: props.todo.instanceTimeSpan
    };

    httpService.put(`/todos/${props.todo.id}.json`, todoData)
      .then((response) => {
        setStartDate((response.data.startDate !== null) ? moment(response.data.startDate) : moment());
        setEndDate((response.data.endDate !== null) ? moment(response.data.endDate) : calculatedEndDate(response.data.startDate, response.data.timeSpan));
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
