import { Grid } from '@mui/material';
import httpService from 'httpService';
import { isInWeekRange } from 'lib/rangeCheck';
import moment from 'moment';
import React from 'react';
import SliderContainer from './SliderContainer';
import TodoItem from './TodoItem';

const rangeMin = 0;
const rangeMax = 6;

export default function TodoWeekSlider(props) {
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
    const todoData = {
      project_id: props.todo.projectId,
      name: props.todo.name,
      description: props.todo.description,
      time_span: props.todo.timeSpan,
      repeat: props.todo.repeat,
      repeat_period: props.todo.repeatPeriod,
      repeat_times: props.todo.repeatTimes,
      instance_time_span: props.todo.instanceTimeSpan
    };

    if (isInWeekRange(startDate, props.selectedWeek)) {
      todoData.start_date = startDate.day(days[0]).toISOString();
    }

    if (isInWeekRange(endDate, props.selectedWeek)) {
      todoData.end_date = endDate.day(days[1]).toISOString();
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
          disableRangeStart={!isInWeekRange(moment(), props.selectedWeek)}
          disableRangeEnd={!isInWeekRange(moment(), props.selectedWeek)}
          handleChange={handleDayChange}
        />
      </Grid>
    </>
  );
}
