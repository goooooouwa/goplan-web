import { Collapse, Grid } from '@mui/material';
import { isInMonthRange, nthWeekOfMonth, todosInMonthRange } from 'utils/rangeCheck';
import moment from 'moment';
import React from 'react';
import TimelineRangeSlider from '../TimelineRangeSlider/TimelineRangeSlider';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import SHARED_PROP_TYPES from 'utils/sharedPropTypes';
import TodoItem from '../TodoItem/TodoItem';
import TimelineSlider from 'components/TimelineSlider/TimelineSlider';


export default function TodoMonthSlider(props) {
  const startDate = (props.todo.startDate !== null) ? moment(props.todo.startDate) : moment();
  const endDate = (props.todo.endDate !== null) ? moment(props.todo.endDate) : moment();
  const [open, setOpen] = React.useState(false);
  const marks = [
    {
      value: 1,
      label: props.selectedMonth.clone().add(0, "weeks").startOf("week").format("[Week 1], MMM")
    },
    {
      value: 2,
      label: props.selectedMonth.clone().add(1, "weeks").startOf("week").format("[Week 2], MMM")
    },
    {
      value: 3,
      label: props.selectedMonth.clone().add(1, "weeks").startOf("week").format("[Week 3], MMM")
    },
    {
      value: 4,
      label: props.selectedMonth.clone().add(3, "weeks").startOf("week").format("[Week 4], MMM")
    },
    {
      value: 5,
      label: props.selectedMonth.clone().add(4, "weeks").startOf("week").format("[Week 5], MMM")
    },
  ];
  const rangeMin = 1;
  const rangeMax = marks.length;

  const handleTodoExpand = () => {
    setOpen(!open);
    props.loadChildren(props.todo);
  };

  const rangeMark = (date) => {
    if (date.isValid()) {
      let rangeMark;
      if (date.isBefore(props.selectedMonth.clone().startOf("month"))) {
        rangeMark = rangeMin;
      } else if (date.isAfter(props.selectedMonth.clone().endOf("month"))) {
        rangeMark = rangeMax;
      } else {
        rangeMark = nthWeekOfMonth(date, props.selectedMonth);
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
            disableRangeStart={props.todo.status || !isInMonthRange(startDate, props.selectedMonth)}
            disableRangeEnd={props.todo.status || !isInMonthRange(endDate, props.selectedMonth)}
            handleChangeCommited={(newValue) => { props.handleWeekChange(props.todo, newValue) }}
          />
        }
        {!props.todo.repeat &&
          <TimelineSlider
            marks={marks}
            rangeMin={rangeMin}
            rangeMax={rangeMax}
            color={props.todo.color}
            rangeStart={rangeMark(startDate)}
            disableRangeStart={props.todo.status || !isInMonthRange(startDate, props.selectedMonth)}
            handleChangeCommited={(newValue) => { props.handleWeekChange(props.todo, newValue) }}
          />
        }
      </Grid>
      {props.todo.children.length > 0 &&
        <Grid item xs={12} md={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {props.todo.children.map((child, index) => (
              <Grid key={index} container item xs={12} md={12}>
                <TodoMonthSlider key={index} todo={child} selectedMonth={props.selectedMonth} handleTodoChange={props.handleTodoChange} handleWeekChange={props.handleWeekChange} loadChildren={props.loadChildren} />
              </Grid>
            ))}
          </Collapse>
        </Grid>
      }
    </>
  );
}

TodoMonthSlider.propTypes = {
  selectedMonth: momentPropTypes.momentObj.isRequired,
  todo: SHARED_PROP_TYPES.todo,
  handleTodoChange: PropTypes.func.isRequired,
  loadChildren: PropTypes.func.isRequired,
  handleWeekChange: PropTypes.func.isRequired
};