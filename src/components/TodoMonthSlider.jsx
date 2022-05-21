import { Grid } from '@mui/material';
import httpService from 'httpService';
import moment from 'moment';
import React from 'react';
import MonthSlider from './MonthSlider';
import { Typography } from "@mui/material";

export default function TodoMonthSlider(props) {
  const startMonth = (props.todo.startDate !== null) ? moment(props.todo.startDate).month() : null;
  const endMonth = (props.todo.endDate !== null) ? moment(props.todo.endDate).month() : null;

  function handleMonthChange(months) {
    const [newStartMonth, newEndMonth] = months;

    if ((newStartMonth !== null && newEndMonth !== null) && (newStartMonth !== moment(props.todo.startDate).month() || newEndMonth !== moment(props.todo.endDate).month())) {
      const startDate = props.todo.startDate !== null ? moment(props.todo.startDate) : moment();
      const endDate = props.todo.endDate !== null ? moment(props.todo.endDate) : moment();

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
  }

  return (
    <>
      <Grid item xs={2}>
        <Typography variant="body1" gutterBottom>
          {props.todo.name}
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <MonthSlider
          startMonth={startMonth}
          endMonth={endMonth}
          handleMonthChange={handleMonthChange}
        />
      </Grid>
    </>
  );
}
