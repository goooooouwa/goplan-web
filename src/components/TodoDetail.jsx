import { Chip, Box, Paper, Stack, Typography, Container, Grid, Button, Checkbox, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import moment from "moment";
import React from "react";
import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import SHARED_PROP_TYPES from "utils/sharedPropTypes";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CircleIcon from '@mui/icons-material/Circle';
import TodoListItem from "./TodoListItem";
import { useTranslation } from 'react-i18next';

export default function TodoDetail(props) {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const todoListUrl = params.projectId !== undefined ? `/projects/${params.projectId}/todos` : '/todos';
  const todoEditUrl = params.projectId !== undefined ? `/projects/${params.projectId}/todos/${props.todo.id}/edit` : `/todos/${props.todo.id}/edit`;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDestroy = () => {
    props.handleTodoDestroy(params.todoId, () => {
      setOpen(false);
      navigate(todoListUrl);
    });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Checkbox
                checked={props.todo.status}
                onChange={(event) => { props.handleTodoChange(event, props.todo) }}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <Typography variant="h4" component="div">
                {props.todo.name}
              </Typography>
              <IconButton component={RouterLink} to={todoEditUrl} sx={{ maxWidth: 160 }}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleClickOpen}>
                <DeleteIcon />
              </IconButton>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {`Are you sure to delete Task ${props.todo.name}?`}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {`This action cannot be undone. This will permanently delete the task ${props.todo.name} and all its subtasks.`}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>{t('Cancel')}</Button>
                  <Button onClick={handleDestroy} color={'error'} autoFocus>
                    {t('Confirm')}
                  </Button>
                </DialogActions>
              </Dialog>
            </Stack>
            <Button variant="contained" component={RouterLink} to={todoListUrl} sx={{ maxWidth: 160 }}>
              {t('Tasks')}
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ my: 2 }}>
            <Paper variant="outlined">
              <Container maxWidth="sm">
                <Stack spacing={2} alignItems="flex-start" sx={{ m: 2 }}>
                  <Typography variant="h5" gutterBottom>
                    {t('Description')}
                  </Typography>
                  <Typography variant="body1" gutterBottom textAlign="left" >
                    {props.todo.description}
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    {t('Color')}
                  </Typography>
                  <CircleIcon sx={{ color: props.todo.color }}/>
                  <Typography variant="h5" gutterBottom>
                    {t('Time schedule')}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {t('Start date: ')}{(props.todo.startDate !== null) ? moment(props.todo.startDate).format("YYYY-MM-DD") : ""}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {t('End date: ')}{(props.todo.startDate !== null) ? moment(props.todo.endDate).format("YYYY-MM-DD") : ""}
                  </Typography>
                  {props.todo.repeat && (
                    <>
                      <Typography variant="body1" gutterBottom>
                        {t('Time span: ')}{moment(props.todo.startDate).isValid() && moment(props.todo.endDate).isValid() ? moment.duration(moment(props.todo.startDate).diff(moment(props.todo.endDate))).humanize() : 0}
                      </Typography>
                      <Typography variant="h5" gutterBottom>
                        {t('Repeating interval')}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {t('Interval: ')}{props.todo.repeatTimes}{t(' times per ')}{t(props.todo.repeatPeriod)}
                      </Typography>
                    </>
                  )}
                  <Typography variant="body1" gutterBottom>
                    {t('Each time: ')}{moment.duration(props.todo.instanceTimeSpan * 3600000).humanize()}
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    {t('Subtasks_')}
                  </Typography>
                  <Grid container spacing={2}>
                    {props.todo.children
                      .map((child, index) => (
                        <TodoListItem key={index} todo={child} handleTodoChange={props.handleSubtaskChange} />
                      ))}
                  </Grid>
                  <Typography variant="h5" gutterBottom>
                    {t('Dependencies_')}
                  </Typography>
                  <Stack justifyContent="center" spacing={1}>
                    {props.todo.dependencies.map((dependency, index) => (
                      <Chip key={index} label={dependency.name} component={RouterLink} to={`/projects/${props.todo.projectId}/todos/${dependency.id}`} clickable />
                    ))}
                  </Stack>
                  <Typography variant="h5" gutterBottom>
                    {t('Dependents_')}
                  </Typography>
                  <Stack justifyContent="center" spacing={1}>
                    {props.todo.dependents.map((dependent, index) => (
                      <Chip key={index} label={dependent.name} component={RouterLink} to={`/projects/${props.todo.projectId}/todos/${dependent.id}`} clickable />
                    ))}
                  </Stack>
                </Stack>
              </Container>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

TodoDetail.propTypes = {
  todo: SHARED_PROP_TYPES.todo,
  handleTodoChange: PropTypes.func.isRequired,
  handleSubtaskChange: PropTypes.func.isRequired,
  handleTodoDestroy: PropTypes.func.isRequired,
};