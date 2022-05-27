import { Grid } from '@mui/material';
import httpService from 'httpService';
import isInYearRange from 'lib/rangeCheck';
import { calculatedEndDate } from 'lib/timeLeft';
import moment from 'moment';
import React, { useState } from 'react';
import SliderContainer from './SliderContainer';
import TodoItem from './TodoItem';

const rangeMin = 0;
const rangeMax = 11;

export default function TodoYearSlider(props) {
  const [startDate, setStartDate] = useState((props.todo.startDate !== null) ? moment(props.todo.startDate) : moment());
  const [endDate, setEndDate] = useState((props.todo.endDate !== null) ? moment(props.todo.endDate) : calculatedEndDate(props.todo.startDate, props.todo.timeSpan));

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
          disableRangeStart={!isInYearRange(startDate, props.selectedYear)}
          disableRangeEnd={!isInYearRange(endDate, props.selectedYear)}
          handleChange={handleMonthChange}
        />
      </Grid>
    </>
  );
}
