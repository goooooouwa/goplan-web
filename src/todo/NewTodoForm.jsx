import { FormControl, FormControlLabel, TextField, MenuItem, Select, Switch, InputLabel, Button, Grid, Typography, Container } from "@mui/material";
import AutoCompleteContainer from "components/AutoCompleteContainer";
import AutoCompleteMultipleContainer from "components/AutoCompleteMultipleContainer";
import httpService from "httpService";
import React, { useCallback, useState } from "react";
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
    startDate: "",
    endDate: "",
    repeat: false,
    repeatPeriod: "604800",
    repeatTimes: "0",
    instanceTimeSpan: "",
    dependencies: [],
    timeSpanCount: "0",
    timeSpanInterval: "2629800",
    instanceTimeSpanCount: "0",
    instanceTimeSpanInterval: "3600",
  });
  const queryByProjectId = params.projectId !== undefined ? `project_id=${params.projectId}&` : '';

  const todoSearch = useCallback((name, callback) => {
    httpService.get(`/todos.json?${queryByProjectId}name=${name}`)
      .then((response) => {
        callback(response.data);
      });
  },[queryByProjectId]);

  const projectSearch = useCallback((name, callback) => {
    httpService.get(`/projects.json?name=${name}`)
      .then((response) => {
        callback(response.data);
      });
  },[]);

  function handleProjectChange(newValue) {
    setTodo((todo) => ({
      ...todo,
      project: newValue,
      projectId: (newValue === null) ? "" : newValue.id
    }));
  }

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
      time_span: Math.round(Number(todo.timeSpanCount) * Number(todo.timeSpanInterval)),
      instance_time_span: Math.round(Number(todo.instanceTimeSpanCount) * Number(todo.instanceTimeSpanInterval)),
      todo_dependencies_attributes: todo.dependencies.map((todo) => ({ todo_id: todo.id })),
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
            <Grid item>
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
                    <MenuItem value="86400">Day</MenuItem>
                    <MenuItem value="604800">Week</MenuItem>
                    <MenuItem value="2629800">Month</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item>
              <FormControl margin="normal" fullWidth>
                <FormControlLabel control={<Switch name="repeat" onChange={handleCheck} checked={todo.repeat} />} label="Is it recurring?" />
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
                        <MenuItem value="86400">Day</MenuItem>
                        <MenuItem value="604800">Week</MenuItem>
                        <MenuItem value="2629800">Month</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="body1" gutterBottom textAlign="left">
                    How long would each time take?
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
                        <MenuItem value="3600">Hour</MenuItem>
                        <MenuItem value="86400">Day</MenuItem>
                        <MenuItem value="604800">Week</MenuItem>
                        <MenuItem value="2629800">Month</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </>
            )}
            <Grid item>
              <Typography variant="h5" gutterBottom textAlign="left">
                Related Todos
              </Typography>
            </Grid>
            <Grid item>
              <FormControl fullWidth margin="normal">
                <AutoCompleteMultipleContainer value={todo.dependencies} label="Depends on" onChange={handleDependencyChange} onSearch={todoSearch} />
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
