import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import { Link as RouterLink } from "react-router-dom";
import React from 'react';
import moment from 'moment';

export default function ProjectList(props) {
  return (
    <List>
      {props.projects.map((project, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton component={RouterLink} to={`/projects/${project.id}/todos`} >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={project.goalName} secondary={(project.targetDate !== null) ? moment(project.targetDate).fromNow() : "Indefinitely"} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
