import { Grid } from '@mui/material';
import httpService from 'httpService';
import { isInWeekRange } from 'lib/rangeCheck';
import { calculatedEndDate } from 'lib/timeLeft';
import moment from 'moment';
import React, { useState } from 'react';
import SliderContainer from './SliderContainer';
import TodoItem from './TodoItem';

const rangeMin = 0;
const rangeMax = 6;

export default function TodoWeekSlider(props) {
  const [startDate, setStartDate] = useState((props.todo.startDate !== null) ? moment(props.todo.startDate) : moment());
  const [endDate, setEndDate] = useState((props.todo.endDate !== null) ? moment(props.todo.endDate) : calculatedEndDate(props.todo.startDate, props.todo.timeSpan));

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

  function handleDayChange(days) {
    const [newStartDay, newEndDay] = days;
    const todoData = {
      project_id: props.todo.projectId,
      name: props.todo.name,
      description: props.todo.description,
      time_span: props.todo.timeSpan,
      start_date: startDate.day(newStartDay).toISOString(),
      end_date: endDate.day(newEndDay).toISOString(),
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
          disableRangeStart={!isInWeekRange(moment(), props.selectedWeek)}
          disableRangeEnd={!isInWeekRange(moment(), props.selectedWeek)}
          handleChange={handleDayChange}
        />
      </Grid>
    </>
  );
}
