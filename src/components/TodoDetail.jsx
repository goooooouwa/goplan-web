import { Chip, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

export default function TodoDetail(props) {
  return (
    <>
      <h2>{props.todo.name}</h2>
      <Typography variant="body1" gutterBottom>
        Description{props.todo.description}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Time span: {props.todo.timeSpan}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Start date: {moment(props.todo.startDate).format("MMMM Do, YYYY")}
      </Typography>
      <Typography variant="body1" gutterBottom>
        End date: {moment(props.todo.endDate).format("MMMM Do, YYYY")}
      </Typography>
      {props.todo.repeat && (
        <>
          <Typography variant="body1" gutterBottom>
            {props.todo.repeatTimes} times per {props.todo.repeatPeriod}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Instance time span: {props.todo.instanceTimeSpan}
          </Typography>
        </>
      )}
      <Typography variant="body1" gutterBottom>
        Is blocked by:
      </Typography>
      {props.todo.dependencies.map((dependency, index) => (
        <Chip key={index} label={dependency.name} component={RouterLink} to={`/projects/${props.todo.projectId}/todos/${dependency.id}`} clickable />
      ))}
      <Typography variant="body1" gutterBottom>
        Is a blocker of:
      </Typography>
      {props.todo.dependents.map((dependent, index) => (
        <Chip key={index} label={dependent.name} component={RouterLink} to={`/projects/${props.todo.projectId}/todos/${dependent.id}`} clickable />
      ))}
    </>
  );
}
