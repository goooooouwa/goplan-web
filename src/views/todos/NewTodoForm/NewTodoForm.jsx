import { FormControl, FormControlLabel, TextField, MenuItem, Select, Switch, InputLabel, Button, Grid, Typography, Container, InputAdornment, Alert } from "@mui/material";
import ProjectAutoComplete from "components/ProjectAutoComplete";
import TodosAutoComplete from "components/TodosAutoComplete";
import httpService from "services/httpService";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { reduce } from "lodash";

export default function NewTodoForm() {
  const params = useParams();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [todo, setTodo] = useState({
    id: null,
    project: null,
    projectId: (params.projectId !== undefined) ? params.projectId : "",
    name: "",
    description: "",
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    repeat: false,
    repeatPeriod: "week",
    repeatTimes: 1,
    instanceTimeSpan: 1,
    dependencies: [],
    newSubtask: "",
    children: [],
  });
  const queryByProjectId = params.projectId !== undefined ? `project_id=${params.projectId}&` : '';
  const dependenciesInJSON = JSON.stringify(todo.dependencies);

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

  useEffect(() => {
    setTodo((todo) => ({
      ...todo,
      startDate: moment.max([moment(todo.startDate), ...todo.dependencies.map((todo) => (moment(todo.endDate).add(1, "days")))].filter((date) => (date.isValid()))).format("YYYY-MM-DD")
    }));
  }, [todo.startDate, dependenciesInJSON]);

  useEffect(() => {
    if (moment(todo.startDate).isValid()) {
      setTodo((todo) => ({
        ...todo,
        endDate: todo.repeat ? moment.max(moment(todo.endDate), moment(todo.startDate).add(1, `${todo.repeatPeriod}s`)).format("YYYY-MM-DD") : todo.startDate
      }));
    }
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

  function handleAddSubtask(event) {
    setTodo((todo) => ({
      ...todo,
      children: [{
        projectId: todo.projectId,
        name: todo.newSubtask,
        startDate: todo.startDate,
        endDate: todo.endDate,
        instanceTimeSpan: Number(todo.instanceTimeSpan),
      }, ...todo.children],
      newSubtask: ''
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
      instance_time_span: Number(todo.instanceTimeSpan),
      todo_dependencies_attributes: todo.dependencies.map((todo) => ({ todo_id: todo.id })),
      children_attributes: todo.children.map((child) => ({
        project_id: child.projectId,
        name: child.name,
        start_date: child.startDate,
        end_date: child.endDate,
        instance_time_span: Number(child.instanceTimeSpan),
      })),
    };

    httpService.post('/todos.json', todoData)
      .then((response) => {
        setError(null);
        setTodo({
          ...response.data,
          startDate: moment(response.data.startDate).format("YYYY-MM-DD"),
          endDate: moment(response.data.endDate).format("YYYY-MM-DD"),
        });
      })
      .catch(function (error) {
        setError(error.response.data);
        console.log(error);
      })
      .then(() => {
        setSubmitted(true);
      });
  }

  return (
    <div>
      {submitted && error === null &&
        <Navigate to={`/projects/${todo.projectId}/todos/${todo.id}`} />
      }
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
            {error !== null &&
              <Grid item>
                <Alert severity="error">{
                  reduce(error, function (result, value, key) {
                    return result + value + '. ';
                  }, '')
                }</Alert>
              </Grid>
            }
            {(params.projectId === undefined) && (
              <Grid item>
                <FormControl fullWidth margin="normal">
                  <ProjectAutoComplete value={todo.project} label="Project" onChange={handleProjectChange} onSearch={projectSearch} />
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
                required
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
            <Grid item>
              <Typography variant="body1" gutterBottom textAlign="left">
                How long would it take each time?
              </Typography>
            </Grid>
            <Grid item container xs={12} spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="instanceTimeSpan"
                  margin="normal"
                  fullWidth
                  value={todo.instanceTimeSpan}
                  onChange={handleChange}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">hours</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
            <Grid item>
              <label>Start Date
                <input
                  type="date"
                  name="startDate"
                  value={todo.startDate}
                  onChange={handleChange}
                  required
                />
              </label>
            </Grid>
            <Grid item>
              <FormControl margin="normal" fullWidth>
                <FormControlLabel control={<Switch name="repeat" onChange={handleCheck} checked={todo.repeat} />} label="Take more than 1 day?" />
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
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
                      required
                    />
                  </label>
                </Grid>
              </>
            )}
            <Grid item>
              <Typography variant="h5" gutterBottom textAlign="left">
                Subtasks
              </Typography>
            </Grid>
            <Grid container alignItems="center" justifyContent="flex-start" direction="row" columnSpacing={1}>
              <Grid item>
                <TextField
                  label="Subtask"
                  name="newSubtask"
                  margin="normal"
                  value={todo.newSubtask}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <FormControl margin="normal">
                  <Button variant="contained" onClick={handleAddSubtask}>Add</Button>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item>
              <ul>
                {todo.children
                  .map((todo, index) => (
                    <li key={index}>
                      <Typography variant="body1" gutterBottom textAlign="left">
                        {
                          todo.name
                        }
                      </Typography>
                    </li>
                  ))}
              </ul>
            </Grid>
            <Grid item>
              <Typography variant="h5" gutterBottom textAlign="left">
                Dependencies
              </Typography>
            </Grid>
            <Grid item>
              <FormControl fullWidth margin="normal">
                <TodosAutoComplete value={todo.dependencies} label="Depended todos" onChange={handleDependencyChange} onSearch={todoSearch} />
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
