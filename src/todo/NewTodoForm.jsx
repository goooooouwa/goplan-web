import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import httpService from "httpService";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export default function NewTodoForm() {
  const [todo, setTodo] = useState({
    id: null,
    projectId: "",
    name: "",
    description: "",
    timeSpan: "",
    startDate: "",
    endDate: "",
    repeat: false,
    repeatPeriod: "week",
    repeatTimes: 0,
    instanceTimeSpan: "",
    dependencies: [],
    dependents: []
  });

  function handleChange(event) {
    setTodo((todo) => ({
      ...todo,
      [event.target.name]: event.target.value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('A todo was submitted:' + todo);

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
        setTodo((todo) => ({
          ...todo,
          id: response.data.id
        }));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      {todo.id && (
        <Navigate to={`/todos/${todo.id}`} />
      )}
      <form onSubmit={handleSubmit}>
        <label>Project ID:
          <input
            type="text"
            name="projectId"
            value={todo.projectId}
            onChange={handleChange}
          />
        </label>
        <label>Todo:
          <input
            type="text"
            name="name"
            value={todo.name}
            onChange={handleChange}
          />
        </label>
        <label>Description:
          <input
            type="text"
            name="description"
            value={todo.description}
            onChange={handleChange}
          />
        </label>
        <label>Time Span:
          <input
            type="number"
            name="timeSpan"
            value={todo.timeSpan}
            onChange={handleChange}
          />
        </label>
        <label>Start Date
          <input
            type="date"
            name="startDate"
            value={todo.startDate}
            onChange={handleChange}
          />
        </label>
        <label>End Date
          <input
            type="date"
            name="endDate"
            value={todo.endDate}
            onChange={handleChange}
          />
        </label>
        <FormControl>
          <FormLabel>Repeat?</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="false"
            name="radio-buttons-group"
            onChange={handleChange}
          >
            <FormControlLabel name="repeat" value="true" control={<Radio />} label="Yes" />
            <FormControlLabel name="repeat" value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        <label>
          Times
          <input
            type="number"
            name="repeatTimes"
            value={todo.repeatTimes}
            onChange={handleChange}
          />
        </label>
        <label>Per
          <select name="repeatPeriod" value={todo.repeatPeriod} onChange={handleChange}>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="quarter">Quarter</option>
          </select>
        </label>
        <label>Instance time span
          <input
            type="number"
            name="instanceTimeSpan"
            value={todo.instanceTimeSpan}
            onChange={handleChange}
          />
        </label>
        <label>Dependencies
          <select multiple name="dependencies" value={todo.dependencies} onChange={handleChange}>
            <option value="1">Todo #1</option>
            <option value="2">Todo #2</option>
            <option value="3">Todo #3</option>
          </select>
        </label>
        <label>Dependents
          <select multiple name="dependents" value={todo.dependents} onChange={handleChange}>
            <option value="1">Todo #1</option>
            <option value="2">Todo #2</option>
            <option value="3">Todo #3</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
