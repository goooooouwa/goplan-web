import { Checkbox, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import SHARED_PROP_TYPES from "utils/sharedPropTypes";

export default function TodoItem(props) {
  return (
    <>
      <ListItem disablePadding>
        <Checkbox
          checked={props.todo.status}
          onChange={(event)=>{props.handleTodoChange(event, props.todo)}}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <ListItemButton component={Link} to={`/projects/${props.todo.projectId}/todos/${props.todo.id}`} >
          <ListItemText primary={props.todo.name} />
        </ListItemButton>
      </ListItem>
    </>
  );
}

TodoItem.propTypes = {
  todo: SHARED_PROP_TYPES.todo,
  handleTodoChange: PropTypes.func.isRequired
};