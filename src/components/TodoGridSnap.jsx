import React, { useEffect, useState } from "react";
import moment from 'moment'
import GridSnap from "./GridSnap";
import httpService from "httpService";

export default function TodoGridSnap(props) {
  const [todo, setTodo] = useState(props.todo);
  let month = moment(todo.startDate).isValid() ? moment(todo.startDate).month() : 0;

  function handleColumnChange(month) {
    setTodo((todo) => ({
      ...todo,
      startDate: moment(todo.startDate).add(month, "M").toString()
    }));
  }

  useEffect(() => {
    const todoData = {
      project_id: todo.projectId,
      name: todo.name,
      description: todo.description,
      time_span: todo.timeSpan,
      start_date: todo.startDate,
      end_date: todo.endDate,
      repeat: todo.repeat,
      repeat_period: todo.repeatPeriod,
      repeat_times: todo.repeatTimes,
      instance_time_span: todo.instanceTimeSpan
    };

    httpService.post('/todos.json', todoData)
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  },[todo]);

  return (
    <>
      <GridSnap title={todo.name} initialColumn={month} handleColumnChange={handleColumnChange} />
    </>
  );
}
