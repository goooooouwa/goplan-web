import { Chip, Box, Paper, Stack, Typography, Container, IconButton } from "@mui/material";
import moment from "moment";
import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';

export default function TodoDetail(props) {
  const params = useParams();
  const todoEditUrl = params.projectId !== undefined ? `/projects/${params.projectId}/todos/${props.todo.id}/edit` : `/todos/${props.todo.id}/edit`;
  return (
    <>
      <Box sx={{ my: 2 }}>
        <Paper variant="outlined">
          <Container maxWidth="sm">
            <Stack spacing={2} alignItems="flex-start" sx={{ m: 2 }}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Typography variant="h4" component="div">
                  {props.todo.name}
                </Typography>
                <IconButton component={RouterLink} to={todoEditUrl} sx={{ maxWidth: 160 }}>
                  <EditIcon />
                </IconButton>
              </Stack>
              <Typography variant="h5" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1" gutterBottom textAlign="left" >
                {props.todo.description}
              </Typography>
              <Typography variant="h5" gutterBottom>
                Time schedule
              </Typography>
              <Typography variant="body1" gutterBottom>
                Start date: {(props.todo.startDate !== null) ? moment(props.todo.startDate).format("YYYY-MM-DD") : ""}
              </Typography>
                  <Typography variant="body1" gutterBottom>
                    Each time: {moment.duration(props.todo.instanceTimeSpan * 3600000).humanize()}
                  </Typography>
              {props.todo.repeat && (
                <>
                  <Typography variant="h5" gutterBottom>
                    Repeating interval
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Interval: {props.todo.repeatTimes} times per {props.todo.repeatPeriod}
                  </Typography>
              <Typography variant="body1" gutterBottom>
                End date: {(props.todo.startDate !== null) ? moment(props.todo.endDate).format("YYYY-MM-DD") : ""}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Time span: {moment.duration(props.todo.timeSpan * 1000).humanize()}
              </Typography>
                </>
              )}
              <Typography variant="h5" gutterBottom>
                Dependencies:
              </Typography>
              <Stack justifyContent="center" spacing={1}>
                {props.todo.dependencies.map((dependency, index) => (
                  <Chip key={index} label={dependency.name} component={RouterLink} to={`/projects/${props.todo.projectId}/todos/${dependency.id}`} clickable />
                ))}
              </Stack>
              <Typography variant="h5" gutterBottom>
                Dependents:
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
    </>
  );
}
