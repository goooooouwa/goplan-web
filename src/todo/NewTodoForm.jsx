import { FormControl, FormControlLabel, TextField, MenuItem, Select, Switch, InputLabel, Button, Grid, Typography, Container } from "@mui/material";
import AutoCompleteContainer from "components/AutoCompleteContainer";
import AutoCompleteMultipleContainer from "components/AutoCompleteMultipleContainer";
import httpService from "httpService";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

export default function NewTodoForm() {
  const params = useParams();
  const [todo, setTodo] = useState({
    id: null,
    project: null,
    projectId: (params.projectId !== undefined) ? params.projectId : "",
    name: "",
    description: "",
    timeSpan: "",
    timeSpanCount: "0",
    timeSpanInterval: "2629800",
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    repeat: false,
    repeatPeriod: "day",
    repeatTimes: "1",
    instanceTimeSpan: "",
    instanceTimeSpanCount: "1",
    instanceTimeSpanInterval: "3600",
    dependencies: [],
  });
  const queryByProjectId = params.projectId !== undefined ? `project_id=${params.projectId}&` : '';

  const todoSearch = useCallback((name, callback) => {
    httpService.get(`/todos.json?${queryByProjectId}name=${name}`)
      .then((response) => {
        callback(response.data);
      });
  }, [queryByProjectId]);

  const projectSearch = useCallback((name, callback) => {
    httpService.get(`/projects.json?name=${name}`)
      .then((response) => {
        callback(response.data);
      });
  }, []);

  function handleProjectChange(newValue) {
    setTodo((todo) => ({
      ...todo,
      project: newValue,
      projectId: (newValue === null) ? "" : newValue.id
    }));
  }

  useEffect(()=>{
    setTodo((todo) => ({
      ...todo,
      startDate: moment.max([moment(todo.startDate), ...todo.dependencies.map((todo) => (moment(todo.endDate).add(1, "days")))].filter((date)=>(date.isValid()))).format("YYYY-MM-DD")
    }));
  }, [todo.startDate, JSON.stringify(todo.dependencies)]);

  useEffect(()=>{
    setTodo((todo) => ({
      ...todo,
      endDate: (todo.repeat && moment(todo.startDate).isValid()) ? moment.max(moment(todo.endDate), moment(todo.startDate).add(1, `${todo.repeatPeriod}s`)).format("YYYY-MM-DD") : todo.endDate
    }));
  }, [todo.startDate, todo.repeat, todo.repeatTimes, todo.repeatPeriod]);

  function handleDependencyChange(newValue) {
    setTodo((todo) => ({
      ...todo,
      dependencies: newValue
    }));
  }

  function handleCheck(event) {
    setTodo((todo) => ({
      ...todo,
      [event.target.name]: event.target.checked
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

    const todoData = {
      project_id: todo.projectId,
      name: todo.name,
      description: todo.description,
      start_date: todo.startDate,
      end_date: todo.endDate,
      repeat: todo.repeat,
      repeat_period: todo.repeatPeriod,
      repeat_times: Math.round(Number(todo.repeatTimes)),
      time_span: (moment(todo.startDate).isValid() && moment(todo.endDate).isValid()) ? moment.duration(moment(todo.startDate).diff(moment(todo.endDate))) : 0,
      instance_time_span: Math.round(Number(todo.instanceTimeSpanCount) * Number(todo.instanceTimeSpanInterval)),
      todo_dependencies_attributes: todo.dependencies.map((todo) => ({ todo_id: todo.id })),
    };

    httpService.post('/todos.json', todoData)
      .then((response) => {
        setTodo(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      {todo.id && (
        <Navigate to={`/projects/${todo.projectId}/todos/${todo.id}`} />
      )}
      <Container
        sx={{
          maxWidth: { xs: 600 },
          mt: 2
        }}
      >
        <Typography variant="h3" component="div" gutterBottom>
          New Todo
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container alignItems="stretch" justifyContent="center" direction="column">
            {(params.projectId === undefined) && (
              <Grid item>
                <FormControl fullWidth margin="normal">
                  <AutoCompleteContainer value={todo.project} label="Project" onChange={handleProjectChange} onSearch={projectSearch} />
                </FormControl>
              </Grid>
            )}
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
                multiline
                rows={4}
                value={todo.description}
                onChange={handleChange}
              />
            </Grid>
            {/* <Grid item>
              <Typography variant="body1" gutterBottom textAlign="left">
                How much time do you need to finish this?
              </Typography>
            </Grid>
            <Grid item container xs={12} spacing={2}>
              <Grid item xs={6}>
                <TextField
                  name="timeSpanCount"
                  margin="normal"
                  fullWidth
                  value={todo.timeSpanCount}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl margin="normal" fullWidth>
                  <Select
                    name="timeSpanInterval"
                    value={todo.timeSpanInterval}
                    onChange={handleChange}
                  >
                    <MenuItem value="3600">Hours</MenuItem>
                    <MenuItem value="86400">Days</MenuItem>
                    <MenuItem value="604800">Weeks</MenuItem>
                    <MenuItem value="2629800">Months</MenuItem>
                    <MenuItem value="31557600">Years</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid> */}
            <Grid item>
              <Typography variant="body1" gutterBottom textAlign="left">
                How long would it take per day?
              </Typography>
            </Grid>
            <Grid item container xs={12} spacing={2}>
              <Grid item xs={6}>
                <TextField
                  name="instanceTimeSpanCount"
                  margin="normal"
                  fullWidth
                  value={todo.instanceTimeSpanCount}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl margin="normal" fullWidth>
                  <Select
                    name="instanceTimeSpanInterval"
                    value={todo.instanceTimeSpanInterval}
                    onChange={handleChange}
                  >
                    <MenuItem value="3600">Hours</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
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
              <FormControl margin="normal" fullWidth>
                <FormControlLabel control={<Switch name="repeat" onChange={handleCheck} checked={todo.repeat} />} label="Recurring?" />
              </FormControl>
            </Grid>
            {todo.repeat && (
              <>
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Times"
                      name="repeatTimes"
                      margin="normal"
                      fullWidth
                      value={todo.repeatTimes}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl margin="normal" fullWidth>
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
                        <MenuItem value="year">Year</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
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
              </>
            )}
            <Grid item>
              <Typography variant="h5" gutterBottom textAlign="left">
                Dependencies
              </Typography>
            </Grid>
            <Grid item>
              <FormControl fullWidth margin="normal">
                <AutoCompleteMultipleContainer value={todo.dependencies} label="Depended todos" onChange={handleDependencyChange} onSearch={todoSearch} />
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
