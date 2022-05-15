import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import { Link as RouterLink } from "react-router-dom";

export default function TodoList(props) {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          {props.todos.map((todo, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton component={RouterLink} to={`/todos/${todo.id}`} >
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
  );
}