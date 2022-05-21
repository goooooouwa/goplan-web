import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function TodoItem(props) {
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton component={Link} to={`/projects/${props.todo.projectId}/todos/${props.todo.id}`} >
          <ListItemText primary={props.todo.name} />
        </ListItemButton>
      </ListItem>
    </>
  );
}
