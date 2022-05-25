import { Grid } from '@mui/material';
import httpService from 'httpService';
import displayElapsedTime from 'lib/timeLeft';
import moment from 'moment';
import React from 'react';
import MonthSlider from './MonthSlider';
import TodoItem from './TodoItem';

export default function TodoMonthSlider(props) {
  const startDate = (props.todo.startDate !== null) ? moment(props.todo.startDate) : moment();
  const timeSpan = displayElapsedTime(props.todo.timeSpan, props.todo.startDate, props.todo.endDate);
  const endDate = (props.todo.endDate === null && timeSpan !== null) ? moment().add(timeSpan.value, timeSpan.label) : moment(props.todo.endDate || '') ;

  function handleMonthChange(months) {
    const [newStartMonth, newEndMonth] = months;
    const todoData = {
      project_id: props.todo.projectId,
      name: props.todo.name,
      description: props.todo.description,
      time_span: props.todo.timeSpan,
      start_date: startDate.month(newStartMonth).toISOString(),
      end_date: endDate.month(newEndMonth).toISOString(),
      repeat: props.todo.repeat,
      repeat_period: props.todo.repeatPeriod,
      repeat_times: props.todo.repeatTimes,
      instance_time_span: props.todo.instanceTimeSpan
    };

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
      <Grid item xs={12} md={8}>
        <MonthSlider
          startMonth={startDate.month()}
          endMonth={endDate.month()}
          handleMonthChange={handleMonthChange}
        />
      </Grid>
    </>
  );
}
