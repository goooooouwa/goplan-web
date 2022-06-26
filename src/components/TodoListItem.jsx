import { Collapse, Grid } from "@mui/material";
import React from "react";
import PropTypes from 'prop-types';
import SHARED_PROP_TYPES from 'utils/sharedPropTypes';
import TodoItem from "./TodoItem/TodoItem";

export default function TodoListItem(props) {
  const [open, setOpen] = React.useState(true);

  const handleTodoExpand = () => {
    setOpen(!open);
  };
  return (
    <>
      <Grid item xs={12}>
        <TodoItem todo={props.todo} todos={props.todos} handleTodoChange={props.handleTodoChange} handleTodoExpand={handleTodoExpand} />
        <Grid item xs={12} md={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {props.todo.dependents.map((dependent, index) => (
              <Grid key={index} container item xs={12} md={12}>
                <TodoListItem key={index} todo={dependent} todos={props.todo.dependents} handleTodoChange={props.handleTodoChange} />
              </Grid>
            ))}
          </Collapse>
        </Grid>
      </Grid>
    </>
  );
}

TodoListItem.propTypes = {
  todo: SHARED_PROP_TYPES.todo,
  todos: PropTypes.arrayOf(SHARED_PROP_TYPES.todo).isRequired,
  handleTodoChange: PropTypes.func.isRequired,
};