import { Checkbox, ListItem, ListItemButton, ListItemText } from "@mui/material";
import httpService from "httpService";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TodoItem(props) {



  return (
    <>
      <ListItem disablePadding>
        <Checkbox
          checked={props.todo.status}
          onChange={props.handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <ListItemButton component={Link} to={`/projects/${props.todo.projectId}/todos/${props.todo.id}`} >
          <ListItemText primary={props.todo.name} />
        </ListItemButton>
      </ListItem>
    </>
  );
}
