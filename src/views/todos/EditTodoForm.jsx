import { FormControl, FormControlLabel, TextField, MenuItem, Select, Switch, InputLabel, Button, Grid, Typography, Container, InputAdornment, Alert } from "@mui/material";
import ProjectAutoComplete from "components/ProjectAutoComplete";
import TodosAutoComplete from "components/TodosAutoComplete";
import httpService from "services/httpService";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { reduce } from "lodash";
import { useTranslation } from 'react-i18next';
import CircleIcon from '@mui/icons-material/Circle';

export default function EditTodoForm() {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const [todo, setTodo] = useState({
    id: null,
    project: null,
    projectId: (params.projectId !== undefined) ? params.projectId : "",
    name: "",
    description: "",
    color: "",
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    repeat: false,
    repeatPeriod: "day",
    repeatTimes: "1",
    instanceTimeSpan: "1",
    dependencies: [],
    newSubtask: "",
    children: [],
  });
  const [originalStartDate, setOriginalStartDate] = useState(null);
  const queryByProjectId = params.projectId !== undefined ? `project_id=${params.projectId}&` : '';
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const dependenciesInJSON = JSON.stringify(todo.dependencies);

  useEffect(() => {
    httpService.get(`/todos/${params.todoId}.json`)
      .then((response) => {
        setTodo((todo) => ({
          ...todo,
          ...response.data,
          startDate: moment(response.data.startDate).format("YYYY-MM-DD"),
          endDate: moment(response.data.endDate).format("YYYY-MM-DD"),
        }));
        setOriginalStartDate(moment(response.data.startDate).format("YYYY-MM-DD"));
      })
      .catch(function (error) {
        setError(error.response.data);
        console.log(error);
      });
  }, [params.todoId]);

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
    setTodo((todo) => ({
      ...todo,
      endDate: (todo.repeat && moment(todo.startDate).isValid()) ? moment.max(moment(todo.endDate), moment(todo.startDate).add(1, `${todo.repeatPeriod}s`)).format("YYYY-MM-DD") : todo.startDate
    }));
  }, [todo.startDate, todo.repeat, todo.repeatPeriod]);

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

  function handleAddSubtask(event) {
    if (todo.newSubtask.trim() === "") {
      return;
    }

    setTodo((todo) => ({
      ...todo,
      children: [
        ...todo.children,
        {
          projectId: todo.projectId,
          name: todo.newSubtask,
        }],
      newSubtask: ''
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
      color: todo.color,
      start_date: todo.startDate,
      end_date: todo.endDate,
      repeat: todo.repeat,
      repeat_period: todo.repeatPeriod,
      repeat_times: Math.round(Number(todo.repeatTimes)),
      instance_time_span: Number(todo.instanceTimeSpan),
      dependencies_attributes: todo.dependencies.map((todo) => (todo.id)),
      children_attributes: todo.children.filter((child) => (child.id === undefined)).map((child) => ({
        name: child.name,
        project_id: child.projectId,
        color: todo.color,
        start_date: originalStartDate,
        end_date: originalStartDate,
      })),
    };

    httpService.put(`/todos/${todo.id}.json`, todoData)
      .then((response) => {
        setError(null);
        setTodo((todo) => ({
          ...todo,
          ...response.data,
          startDate: moment(response.data.startDate).format("YYYY-MM-DD"),
          endDate: moment(response.data.endDate).format("YYYY-MM-DD"),
        }));
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
      {(submitted && error === null) && (
        <Navigate to={`/projects/${todo.projectId}/todos/${todo.id}`} />
      )}
      <Container
        sx={{
          maxWidth: { xs: 600 },
          mt: 2
        }}
      >
        <Typography variant="h3" component="div" gutterBottom>
          {t('Edit Task')}
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
                  <ProjectAutoComplete value={todo.project} label={t("Project")} onChange={handleProjectChange} onSearch={projectSearch} />
                </FormControl>
              </Grid>
            )}
            <Grid item>
              <TextField
                label={t("Task")}
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
                label={t("Description")}
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
              <FormControl margin="normal" fullWidth>
                <InputLabel>{t('Color')}</InputLabel>
                <Select
                  name="color"
                  label={t('Color')}
                  value={todo.color}
                  sx={{ color: todo.color }}
                  onChange={handleChange}
                >
                  <MenuItem value="primary.main">
                    <CircleIcon sx={{ color: "primary.main" }} />
                  </MenuItem>
                  <MenuItem value="secondary.light">
                    <CircleIcon sx={{ color: "secondary.light" }} />
                  </MenuItem>
                  <MenuItem value="warning.light">
                    <CircleIcon sx={{ color: "warning.light" }} />
                  </MenuItem>
                  <MenuItem value="info.light">
                    <CircleIcon sx={{ color: "info.light" }} />
                  </MenuItem>
                  <MenuItem value="success.light">
                    <CircleIcon sx={{ color: "success.light" }} />
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid item>
              <Typography variant="body1" gutterBottom textAlign="left">
                {t('How long would it take each time?')}
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
                  InputProps={{
                    endAdornment: <InputAdornment position="start">{t('hours')}</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid> */}
            <Grid item mt={2}>
              <label>{t('Start Date')}
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
                <FormControlLabel control={<Switch name="repeat" onChange={handleCheck} checked={todo.repeat} />} label={t("Take more than 1 day?")} />
              </FormControl>
            </Grid>
            {todo.repeat && (
              <>
                <Grid item mt={1} mb={2}>
                  <label>{t('End Date')}
                    <input
                      type="date"
                      name="endDate"
                      value={todo.endDate}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </Grid>
                {/* <Grid item spacing={2} sx={{mt: 2}}>
                  <Typography variant="body1" gutterBottom textAlign="left">
                    {t('How frequent would each time occur?')}
                  </Typography>
                </Grid>
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label={t('Times')}
                      name="repeatTimes"
                      margin="normal"
                      fullWidth
                      value={todo.repeatTimes}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl margin="normal" fullWidth>
                      <InputLabel>{t('Per')}</InputLabel>
                      <Select
                        name="repeatPeriod"
                        label={t('Per')}
                        value={todo.repeatPeriod}
                        onChange={handleChange}
                      >
                        <MenuItem value="day">{t('Day')}</MenuItem>
                        <MenuItem value="week">{t('Week')}</MenuItem>
                        <MenuItem value="month">{t('Month')}</MenuItem>
                        <MenuItem value="quarter">{t('Quarter')}</MenuItem>
                        <MenuItem value="year">{t('Year')}</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid> */}
              </>
            )}
            <Grid item>
              <Typography variant="h5" gutterBottom textAlign="left">
                {t('Subtasks')}
              </Typography>
            </Grid>
            <Grid container alignItems="center" justifyContent="flex-start" direction="row" columnSpacing={1}>
              <Grid item>
                <TextField
                  label={t('Subtask')}
                  name="newSubtask"
                  margin="normal"
                  value={todo.newSubtask}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <FormControl margin="normal">
                  <Button variant="outlined" onClick={handleAddSubtask}>{t('Add')}</Button>
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
                {t('Dependencies')}
              </Typography>
            </Grid>
            <Grid item>
              <FormControl fullWidth margin="normal">
                <TodosAutoComplete value={todo.dependencies} label={t("Depended tasks")} onChange={handleDependencyChange} onSearch={todoSearch} />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl margin="normal">
                <Button variant="contained" type="submit">{t('Submit')}</Button>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div >
  );
}
