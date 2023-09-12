import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link as RouterLink } from "react-router-dom";
import React from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

export default function ProjectList(props) {
  const { t, i18n } = useTranslation();
  return (
    <List>
      {props.projects.map((project, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton component={RouterLink} to={`/projects/${project.id}/todos`} >
            <ListItemText primary={project.name} secondary={(project.targetDate !== null) ? moment(project.targetDate).fromNow() : t('Indefinitely')} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
