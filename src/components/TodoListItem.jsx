import { Collapse, Grid } from "@mui/material";
import React from "react";
import PropTypes from 'prop-types';
import SHARED_PROP_TYPES from 'utils/sharedPropTypes';
import TodoItem from "./TodoItem/TodoItem";

export default function TodoListItem(props) {
  const [open, setOpen] = React.useState(false);

  const handleTodoExpand = () => {
    setOpen(!open);
  };
  return (
    <>
      <Grid item xs={12}>
        <TodoItem todo={props.todo} handleTodoChange={props.handleTodoChange} handleTodoExpand={handleTodoExpand} />
        <Grid item xs={12}>
          {props.todo.children.length > 0 &&
            <Collapse in={open} timeout="auto" unmountOnExit>
              {props.todo.children.map((child, index) => (
                <Grid key={index} container item xs={12} md={12}>
                  <TodoListItem key={index} todo={child} handleTodoChange={props.handleTodoChange} />
                </Grid>
              ))}
            </Collapse>
          }
        </Grid>
      </Grid>
    </>
  );
}

TodoListItem.propTypes = {
  todo: SHARED_PROP_TYPES.todo,
  handleTodoChange: PropTypes.func.isRequired,
};