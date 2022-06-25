import { Collapse, Grid } from "@mui/material";
import React from "react";
import TodoItem from "./TodoItem/TodoItem";

export default function TodoListItem(props) {
  const [open, setOpen] = React.useState(true);

  const handleTodoExpand = () => {
    setOpen(!open);
  };
  return (
    <>
      <Grid item xs={12}>
        <TodoItem todo={props.todo} handleTodoChange={props.handleTodoChange} handleTodoExpand={handleTodoExpand} />
        <Grid item xs={12} md={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {props.todo.dependents.map((dependent, index) => (
              <Grid key={index} container item xs={12} md={12}>
                <TodoListItem key={index} todo={dependent} handleTodoChange={props.handleTodoChange} />
              </Grid>
            ))}
          </Collapse>
        </Grid>
      </Grid>
    </>
  );
}
