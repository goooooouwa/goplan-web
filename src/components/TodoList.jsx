import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList(props) {
  return (
    <>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <nav aria-label="main mailbox folders">
          <List>
            {props.todos.map((todo, index) => (
              <TodoItem key={index} todo={todo}/>
            ))}
          </List>
        </nav>
      </Box>
    </>
  );
}
