import { Collapse, Grid } from '@mui/material';
import { isInMonthRange, nthWeekOfMonth } from 'utils/rangeCheck';
import moment from 'moment';
import React from 'react';
import TimelineRangeSlider from '../TimelineRangeSlider/TimelineRangeSlider';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import SHARED_PROP_TYPES from 'utils/sharedPropTypes';
import TodoItem from '../TodoItem/TodoItem';
import TimelineSlider from 'components/TimelineSlider/TimelineSlider';
import todoTraversal from 'utils/todoTraversal';

const marks = [
  {
    value: 1,
    label: 'Week 1',
  },
  {
    value: 2,
    label: 'Week 2',
  },
  {
    value: 3,
    label: 'Week 3',
  },
  {
    value: 4,
    label: 'Week 4',
  },
  {
    value: 5,
    label: 'Week 5',
  },
];

const rangeMin = 1;
const rangeMax = 5;

export default function TodoMonthSlider(props) {
  const startDate = (props.todo.startDate !== null) ? moment(props.todo.startDate) : moment();
  const endDate = (props.todo.endDate !== null) ? moment(props.todo.endDate) : moment();
  const [open, setOpen] = React.useState(false);

  const handleTodoExpand = () => {
    setOpen(!open);
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
            marks={props.marks}
            rangeMin={rangeMin}
            rangeMax={rangeMax}
            rangeStart={rangeMark(startDate)}
            rangeEnd={rangeMark(endDate)}
            disableRangeStart={props.todo.status || !isInMonthRange(startDate, props.selectedMonth)}
            disableRangeEnd={props.todo.status || !isInMonthRange(endDate, props.selectedMonth)}
            handleChangeCommited={(newValue) => { props.handleWeekChange(props.todo, newValue) }}
          />
        }
        {!props.todo.repeat &&
          <TimelineSlider
            marks={props.marks}
            rangeMin={rangeMin}
            rangeMax={rangeMax}
            rangeStart={rangeMark(startDate)}
            disableRangeStart={props.todo.status || !isInMonthRange(startDate, props.selectedMonth)}
            handleChangeCommited={(newValue) => { props.handleWeekChange(props.todo, newValue) }}
          />
        }
      </Grid>
      {Array.isArray(props.todo.dependencies) && props.todo.dependencies.length > 0 &&
        <Grid item xs={12} md={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {props.todo.dependencies.map((dependent, index) => (
              <Grid key={index} container item xs={12} md={12}>
                <TodoMonthSlider key={index} todo={dependent} marks={marks} selectedMonth={props.selectedMonth} handleTodoChange={props.handleTodoChange} handleWeekChange={props.handleWeekChange} />
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
  marks: SHARED_PROP_TYPES.marks,
  todo: SHARED_PROP_TYPES.todo,
  handleTodoChange: PropTypes.func.isRequired,
  handleWeekChange: PropTypes.func.isRequired
};