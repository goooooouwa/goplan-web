import { Collapse, Grid } from "@mui/material";
import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import SHARED_PROP_TYPES from 'utils/sharedPropTypes';
import TodoItem from "./TodoItem/TodoItem";

export default function TodoListItem(props) {
  const [open, setOpen] = React.useState(false);

  const handleTodoExpand = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (open) {
      props.loadChildren(props.todo);
    }
  });

  return (
    <>
      <Grid item xs={12}>
        <TodoItem todo={props.todo} handleTodoChange={props.handleTodoChange} handleTodoExpand={handleTodoExpand} />
        <Grid item xs={12}>
          {!props.todo.status && props.todo.numberOfChildren > 0 &&
            <Collapse in={open} timeout="auto" unmountOnExit>
              {props.todo.children.map((child, index) => (
                <Grid key={index} container item xs={12} md={12}>
                  <TodoListItem todo={child} handleTodoChange={props.handleTodoChange} loadChildren={props.loadChildren} />
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
  loadChildren: PropTypes.func.isRequired,
};