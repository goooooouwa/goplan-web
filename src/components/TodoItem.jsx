import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';
import React from "react";
import { Link } from "react-router-dom";

export default function TodoItem(props) {
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton component={Link} to={`/projects/${props.todo.projectId}/todos/${props.todo.id}`} >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={props.todo.name} />
        </ListItemButton>
      </ListItem>
    </>
  );
}
