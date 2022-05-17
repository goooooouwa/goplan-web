import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';
import React from "react";
import { Link } from "react-router-dom";

export default function TodosList(props) {
  return (
    <>
      <main>
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <nav aria-label="main mailbox folders">
            <List>
              {props.todos.map((todo, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton component={Link} to={`/projects/${todo.projectId}/todos/${todo.id}`} >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={todo.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </nav>
        </Box>
      </main>
    </>
  );
}
