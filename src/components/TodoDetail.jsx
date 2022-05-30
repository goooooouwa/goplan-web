import { Chip, Box, Paper, Stack, Typography, Container } from "@mui/material";
import moment from "moment";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

export default function TodoDetail(props) {
  return (
    <>
      <Box sx={{ my: 2 }}>
        <Paper variant="outlined">
          <Container maxWidth="sm">
            <Stack spacing={2} alignItems="flex-start" sx={{ m: 2 }}>
              <Typography variant="h4" gutterBottom>
                {props.todo.name}
              </Typography>
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
                End date: {(props.todo.startDate !== null) ? moment(props.todo.endDate).format("YYYY-MM-DD") : ""}
              </Typography>
              <Typography variant="body1" gutterBottom>
                    Time span: {moment.duration(props.todo.timeSpan*1000).humanize()}
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
                    Each time: {moment.duration(props.todo.instanceTimeSpan*1000).humanize()}
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
