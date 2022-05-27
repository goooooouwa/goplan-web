import { Grid } from '@mui/material';
import httpService from 'httpService';
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
  const selectedYear = moment(props.selectedYear);

  const isInRange = (date) => {
    return date.isValid() && (date.isAfter(selectedYear.startOf("year")) && date.isBefore(selectedYear.endOf("year")));
  };

  const rangeMark = (date) => {
    if (date.isValid()) {
      let rangeMark;
      if (date.isBefore(selectedYear.startOf("year"))) {
        rangeMark = rangeMin;
      } else if (date.isAfter(selectedYear.endOf("year"))) {
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
          disableRangeStart={!isInRange(startDate)}
          disableRangeEnd={!isInRange(endDate)}
          handleChange={handleMonthChange}
        />
      </Grid>
    </>
  );
}
