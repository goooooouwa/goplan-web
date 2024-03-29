import { Checkbox, IconButton, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import SHARED_PROP_TYPES from "utils/sharedPropTypes";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export default function TodoItem(props) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
    props.handleTodoExpand();
  };

  return (
    <>
      <ListItem
        component="div"
        disablePadding
        secondaryAction={
          <>
            { !props.todo.status && props.todo.numberOfChildren > 0 &&
              <IconButton edge="end" aria-label="expand" onClick={handleClick}>
                {
                  open ? <ExpandLess /> : <ExpandMore />
                }
              </IconButton>
            }
          </>
        }
        sx={{
          pl: (props.todo.numberOfParents > 0) ? 4 : 0
        }}
      >
        <Checkbox
          checked={props.todo.status}
          onChange={(event) => { props.handleTodoChange(event, props.todo) }}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <ListItemButton component={Link} to={`/projects/${props.todo.projectId}/todos/${props.todo.id}`}>
          <ListItemText
            primary={props.todo.name}
            sx={{
              textDecoration: props.todo.status ? 'line-through' : 'none',
              color: props.todo.status ? 'text.secondary' : 'text.primary',
            }} />
        </ListItemButton>
      </ListItem>
    </>
  );
}

TodoItem.propTypes = {
  todo: SHARED_PROP_TYPES.todo,
  handleTodoChange: PropTypes.func.isRequired,
  handleTodoExpand: PropTypes.func.isRequired
};