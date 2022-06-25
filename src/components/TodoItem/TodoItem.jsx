import { Checkbox, Collapse, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import SHARED_PROP_TYPES from "utils/sharedPropTypes";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export default function TodoItem(props) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem component="div" disablePadding>
        <Checkbox
          checked={props.todo.status}
          onChange={(event) => { props.handleTodoChange(event, props.todo) }}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <ListItemButton component={Link} to={`/projects/${props.todo.projectId}/todos/${props.todo.id}`}>
          <ListItemText
            primary={
              props.todo.name
            }
            sx={{
              textDecoration: props.todo.status ? 'line-through' : 'none',
              color: props.todo.status ? 'text.secondary' : 'text.primary',
            }} />
        </ListItemButton>
        {props.todo.dependents.length > 0 &&
          <>
            {
              open ? <ExpandLess onClick={handleClick} /> : <ExpandMore onClick={handleClick} />
            }
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {
                  props.todo.dependents
                    .map((todo, index) => (
                      <ListItem key={index}>
                        <Checkbox
                          checked={props.todo.status}
                          onChange={(event) => { props.handleTodoChange(event, todo) }}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <ListItemButton component={Link} to={`/projects/${todo.projectId}/todos/${todo.id}`}>
                          <ListItemText
                            primary={
                              todo.name
                            }
                            sx={{
                              textDecoration: props.todo.status ? 'line-through' : 'none',
                              color: props.todo.status ? 'text.secondary' : 'text.primary',
                            }} />
                        </ListItemButton>
                      </ListItem>
                    ))
                }
              </List>
            </Collapse>
          </>
        }
      </ListItem>
    </>
  );
}

TodoItem.propTypes = {
  todo: SHARED_PROP_TYPES.todo,
  handleTodoChange: PropTypes.func.isRequired
};