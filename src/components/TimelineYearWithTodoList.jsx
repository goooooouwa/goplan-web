import React from "react";
import { Typography } from "@mui/material";
import MasterDetailsLayout from "./MasterDetailsLayout";
import TodoList from "./TodoList";
import TimelineYear from "./TimelineYear";

export default function TimelineYearWithTodoList(props) {
  return (
    <>
      <Typography variant="h3" component="div" gutterBottom>
        Timeline (Year)
      </Typography>
      <MasterDetailsLayout
        master={
          <TodoList todos={props.todos} />
        }
        details={
          <TimelineYear todos={props.todos} />
        } />
    </>
  );
}
