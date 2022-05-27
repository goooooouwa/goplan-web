import { Grid } from '@mui/material';
import httpService from 'httpService';
import displayElapsedTime from 'lib/timeLeft';
import moment from 'moment';
import React from 'react';
import SliderContainer from './SliderContainer';
import TodoItem from './TodoItem';

export default function TodoMonthSlider(props) {
  const startDate = (props.todo.startDate !== null) ? moment(props.todo.startDate) : moment();
  const timeSpan = displayElapsedTime(props.todo.timeSpan, props.todo.startDate, props.todo.endDate);
  let endDate;
  if (props.todo.endDate !== null) {
    endDate = moment(props.todo.endDate);
  } else if (props.todo.endDate === null && timeSpan !== null) {
    endDate = moment().add(timeSpan.value, timeSpan.label);
  } else {
    endDate = moment();
  }

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
      <Grid item xs={12} md={8} sx={{ px: 3}}>
        <SliderContainer
          marks={props.marks}
          max={4}
          start={Math.ceil(startDate.date() / 7) - 1}
          end={Math.ceil(endDate.date() / 7) - 1}
          handleChange={handleWeekChange}
        />
      </Grid>
    </>
  );
}
