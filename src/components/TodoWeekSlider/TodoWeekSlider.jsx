import { Collapse, Grid } from '@mui/material';
import { isInWeekRange, todosInWeekRange } from 'utils/rangeCheck';
import moment from 'moment';
import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import SHARED_PROP_TYPES from 'utils/sharedPropTypes';
import TimelineRangeSlider from 'components/TimelineRangeSlider/TimelineRangeSlider';
import TodoItem from 'components/TodoItem/TodoItem';
import TimelineSlider from 'components/TimelineSlider/TimelineSlider';


export default function TodoWeekSlider(props) {
  const startDate = (props.todo.startDate !== null) ? moment(props.todo.startDate) : moment();
  const endDate = (props.todo.endDate !== null) ? moment(props.todo.endDate) : moment();
  const [open, setOpen] = React.useState(false);
  const marks = [
    {
      value: 0,
      label: props.selectedWeek.clone().startOf("week").format("MMM DD, YYYY"),
    },
    {
      value: 1,
      label: props.selectedWeek.clone().startOf("week").add(1, 'days').format("MMM DD, YYYY"),
    },
    {
      value: 2,
      label: props.selectedWeek.clone().startOf("week").add(2, 'days').format("MMM DD, YYYY"),
    },
    {
      value: 3,
      label: props.selectedWeek.clone().startOf("week").add(3, 'days').format("MMM DD, YYYY"),
    },
    {
      value: 4,
      label: props.selectedWeek.clone().startOf("week").add(4, 'days').format("MMM DD, YYYY"),
    },
    {
      value: 5,
      label: props.selectedWeek.clone().startOf("week").add(5, 'days').format("MMM DD, YYYY"),
    },
    {
      value: 6,
      label: props.selectedWeek.clone().startOf("week").add(6, 'days').format("MMM DD, YYYY"),
    },
  ];

  const rangeMin = 0;
  const rangeMax = 6;

  const handleTodoExpand = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (open) {
      props.loadChildren(props.todo);
    }
  });

  const rangeMark = (date) => {
    if (date.isValid()) {
      let rangeMark;
      if (date.isBefore(props.selectedWeek.clone().startOf("week"))) {
        rangeMark = rangeMin;
      } else if (date.isAfter(props.selectedWeek.clone().endOf("week"))) {
        rangeMark = rangeMax;
      } else {
        rangeMark = date.day();
      }
      return rangeMark;
    } else {
      return -1;
    }
  };

  return (
    <>
      <Grid item xs={12} md={4}>
        <TodoItem todo={props.todo} handleTodoChange={props.handleTodoChange} handleTodoExpand={handleTodoExpand} />
      </Grid>
      <Grid item xs={12} md={8} sx={{ px: 3 }}>
        {props.todo.repeat &&
          <TimelineRangeSlider
            marks={marks}
            rangeMin={rangeMin}
            rangeMax={rangeMax}
            color={props.todo.color}
            rangeStart={rangeMark(startDate)}
            rangeEnd={rangeMark(endDate)}
            disableRangeStart={props.todo.status || !isInWeekRange(startDate, props.selectedWeek)}
            disableRangeEnd={props.todo.status || !isInWeekRange(endDate, props.selectedWeek)}
            handleChangeCommited={(newValue) => { props.handleDayChange(props.todo, newValue) }}
          />
        }
        {!props.todo.repeat &&
          <TimelineSlider
            marks={marks}
            rangeMin={rangeMin}
            rangeMax={rangeMax}
            color={props.todo.color}
            rangeStart={rangeMark(startDate)}
            disableRangeStart={props.todo.status || !isInWeekRange(startDate, props.selectedWeek)}
            handleChangeCommited={(newValue) => { props.handleDayChange(props.todo, newValue) }}
          />
        }
      </Grid>
      {todosInWeekRange(props.todo.children, props.selectedWeek).length > 0 &&
        <Grid item xs={12} md={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {todosInWeekRange(props.todo.children, props.selectedWeek).map((child, index) => (
              <Grid key={index} container item xs={12} md={12}>
                <TodoWeekSlider key={index} todo={child} selectedWeek={props.selectedWeek} handleTodoChange={props.handleTodoChange} handleDayChange={props.handleDayChange} loadChildren={props.loadChildren} />
              </Grid>
            ))}
          </Collapse>
        </Grid>
      }
    </>
  );
}

TodoWeekSlider.propTypes = {
  selectedWeek: momentPropTypes.momentObj.isRequired,
  todo: SHARED_PROP_TYPES.todo,
  handleTodoChange: PropTypes.func.isRequired,
  loadChildren: PropTypes.func.isRequired,
  handleDayChange: PropTypes.func.isRequired
};