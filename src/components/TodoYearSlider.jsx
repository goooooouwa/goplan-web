import { Grid } from '@mui/material';
import httpService from 'httpService';
import displayElapsedTime from 'lib/timeLeft';
import moment from 'moment';
import React from 'react';
import SliderContainer from './SliderContainer';
import TodoItem from './TodoItem';

const rangeMin = 0;
const rangeMax = 11;

function rangeMark(date){
  if (date.isValid()) {
    let rangeMark;
    if (date.isBefore(moment().startOf("year"))) {
      rangeMark = rangeMin;
    } else if (date.isAfter(moment().endOf("year"))) {
      rangeMark = rangeMax;
    } else {
      rangeMark = date.month();
    }
    return rangeMark;
  } else {
    return -1;
  }
}

export default function TodoYearSlider(props) {
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
      <Grid item xs={12} md={8} sx={{ px: 3 }}>
        <SliderContainer
          marks={props.marks}
          rangeMin={rangeMin}
          rangeMax={rangeMax}
          rangeStart={rangeMark(startDate)}
          rangeEnd={rangeMark(endDate)}
          handleChange={handleMonthChange}
        />
      </Grid>
    </>
  );
}
