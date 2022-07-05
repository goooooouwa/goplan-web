import { Stack, Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function TodoActionGroup(props) {
  const params = useParams();
  const timelineYearUrl = params.projectId !== undefined ? `/projects/${params.projectId}/year` : '/timeline';
  const timelineQuarterUrl = params.projectId !== undefined ? `/projects/${params.projectId}/quarter` : '/timeline/quarter';
  const timelineMonthUrl = params.projectId !== undefined ? `/projects/${params.projectId}/month` : '/timeline/month';
  const timelineWeekUrl = params.projectId !== undefined ? `/projects/${params.projectId}/week` : '/timeline/week';
  const todoListUrl = params.projectId !== undefined ? `/projects/${params.projectId}/todos` : '/todos';
  const newTodoUrl = params.projectId !== undefined ? `/projects/${params.projectId}/todos/new` : '/todos/new';

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'stretch', sm: 'baseline' }}
      justifyContent="space-between"
      spacing={2}
    >
      <Button variant="contained" component={RouterLink} to={newTodoUrl} sx={{ maxWidth: 160 }}>
        New Todo
      </Button>
      <Button
        variant="outlined"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
        sx={{ maxWidth: 160 }}
      >
        {props.activeViewTitle}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem component={RouterLink} to={todoListUrl}>Tasks</MenuItem>
        <MenuItem component={RouterLink} to={timelineYearUrl} sx={{ minWidth: 110 }}>Year</MenuItem>
        <MenuItem component={RouterLink} to={timelineQuarterUrl}>Quarter</MenuItem>
        <MenuItem component={RouterLink} to={timelineMonthUrl}>Month</MenuItem>
        <MenuItem component={RouterLink} to={timelineWeekUrl}>Week</MenuItem>
      </Menu>
    </Stack>
  );
}