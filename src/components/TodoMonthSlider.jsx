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
  let endDate;
  if (props.todo.endDate !== null) {
    endDate = moment(props.todo.endDate);
  } else {
    if (moment(props.todo.startDate).isValid() && typeof props.todo.timeSpan === 'number') {
      endDate = moment(props.todo.startDate).add(props.todo.timeSpan * 1000, "milliseconds");
    } else {
      endDate = moment();
    }
  }

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
