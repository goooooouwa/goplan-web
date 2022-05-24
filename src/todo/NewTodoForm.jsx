import { PropaneSharp } from "@mui/icons-material";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Checkbox, FormGroup, MenuItem, Select, Switch, Box, Chip, InputLabel, OutlinedInput, Button, Grid, Typography, Container } from "@mui/material";
import TodoAutoComplete from "components/TodoAutoComplete";
import httpService from "httpService";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

  function handleDependencyChange(newValue) {
    setTodo((todo) => ({
      ...todo,
      dependencies: newValue
    }));
  }

  function handleDependentChange(newValue) {
    setTodo((todo) => ({
      ...todo,
      dependents: newValue
    }));
  }

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
      instance_time_span: todo.instanceTimeSpan,
      dependencies: todo.dependencies.map((todo) => todo.id),
      dependents: todo.dependents.map((todo) => todo.id),
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
      <Container
        sx={{
          maxWidth: { xs: 600 }
        }}
      >
        <Typography variant="h3" component="div" gutterBottom>
          New Todo
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container alignItems="stretch" justifyContent="center" direction="column">
            <Grid item>
              <TextField
                label="Project ID"
                name="projectId"
                margin="normal"
                fullWidth
                value={todo.projectId}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Todo"
                name="name"
                margin="normal"
                fullWidth
                value={todo.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Description"
                name="description"
                margin="normal"
                fullWidth
                value={todo.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Time Span"
                name="timeSpan"
                margin="normal"
                fullWidth
                value={todo.timeSpan}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <label>Start Date
                <input
                  type="date"
                  name="startDate"
                  value={todo.startDate}
                  onChange={handleChange}
                />
              </label>
            </Grid>
            <Grid item>
              <label>End Date
                <input
                  type="date"
                  name="endDate"
                  value={todo.endDate}
                  onChange={handleChange}
                />
              </label>
            </Grid>
            <Grid item>
              <FormControl margin="normal" fullWidth>
                <FormControlLabel control={<Switch name="repeat" onChange={handleChange} defaultChecked={false} />} label="Repeat?" />
              </FormControl>
            </Grid>
            <Grid item>
              <TextField
                label="Times"
                name="repeatTimes"
                margin="normal"
                fullWidth
                value={todo.repeatTimes}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <FormControl fullWidth margin="normal">
                <InputLabel>Per</InputLabel>
                <Select
                  name="repeatPeriod"
                  label="Per"
                  value={todo.repeatPeriod}
                  onChange={handleChange}
                >
                  <MenuItem value="day">Day</MenuItem>
                  <MenuItem value="week">Week</MenuItem>
                  <MenuItem value="month">Month</MenuItem>
                  <MenuItem value="quarter">Quarter</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <TextField
                label="Instance time span"
                name="instanceTimeSpan"
                margin="normal"
                fullWidth
                value={todo.instanceTimeSpan}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <FormControl fullWidth margin="normal">
                <TodoAutoComplete value={todo.dependencies} label="Depends on" onChange={handleDependencyChange} />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth margin="normal">
                <TodoAutoComplete value={todo.dependents} label="Dependent of" onChange={handleDependentChange} />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl margin="normal">
                <Button variant="contained" type="submit">Submit</Button>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div >
  );
}
