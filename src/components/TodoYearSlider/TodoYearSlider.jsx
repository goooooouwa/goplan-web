import { Collapse, Grid } from '@mui/material';
import isInYearRange from 'utils/rangeCheck';
import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import SHARED_PROP_TYPES from 'utils/sharedPropTypes';
import TimelineRangeSlider from 'components/TimelineRangeSlider/TimelineRangeSlider';
import TodoItem from 'components/TodoItem/TodoItem';
import TimelineSlider from 'components/TimelineSlider/TimelineSlider';
import todoTraversal from 'utils/todoTraversal';

const marks = [
  {
    value: 0,
    label: 'Jan',
  },
  {
    value: 1,
    label: 'Feb',
  },
  {
    value: 2,
    label: 'Mar',
  },
  {
    value: 3,
    label: 'Apr',
  },
  {
    value: 4,
    label: 'May',
  },
  {
    value: 5,
    label: 'Jun',
  },
  {
    value: 6,
    label: 'Jul',
  },
  {
    value: 7,
    label: 'Aug',
  },
  {
    value: 8,
    label: 'Sep',
  },
  {
    value: 9,
    label: 'Oct',
  },
  {
    value: 10,
    label: 'Nov',
  },
  {
    value: 11,
    label: 'Dec',
  },
];

const rangeMin = 0;
const rangeMax = 11;

export default function TodoYearSlider(props) {
  const startDate = (props.todo.startDate !== null) ? moment(props.todo.startDate) : moment();
  const endDate = (props.todo.endDate !== null) ? moment(props.todo.endDate) : moment();
  const [open, setOpen] = React.useState(false);

  const handleTodoExpand = () => {
    setOpen(!open);
  };

  const rangeMark = (date) => {
    if (date.isValid()) {
      let rangeMark;
      if (date.isBefore(props.selectedYear.clone().startOf("year"))) {
        rangeMark = rangeMin;
      } else if (date.isAfter(props.selectedYear.clone().endOf("year"))) {
        rangeMark = rangeMax;
      } else {
        rangeMark = date.month();
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
            disableRangeStart={props.todo.status || !isInYearRange(startDate, props.selectedYear)}
            disableRangeEnd={props.todo.status || !isInYearRange(endDate, props.selectedYear)}
            handleChangeCommited={(newValue) => { props.handleMonthChange(props.todo, newValue) }}
          />
        }
        {!props.todo.repeat &&
          <TimelineSlider
            marks={props.marks}
            rangeMin={rangeMin}
            rangeMax={rangeMax}
            rangeStart={rangeMark(startDate)}
            disableRangeStart={props.todo.status || !isInYearRange(startDate, props.selectedYear)}
            handleChangeCommited={(newValue) => { props.handleMonthChange(props.todo, newValue) }}
          />
        }
      </Grid>
      {props.todo.dependents.length > 0 &&
        <Grid item xs={12} md={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {props.todo.dependents.map((dependent, index) => (
              <Grid key={index} container item xs={12} md={12}>
                <TodoYearSlider key={index} todo={dependent} marks={marks} selectedYear={props.selectedYear} handleTodoChange={props.handleTodoChange} handleMonthChange={props.handleMonthChange} />
              </Grid>
            ))}
          </Collapse>
        </Grid>
      }
    </>
  );
}

TodoYearSlider.propTypes = {
  selectedYear: momentPropTypes.momentObj.isRequired,
  marks: SHARED_PROP_TYPES.marks,
  todo: SHARED_PROP_TYPES.todo,
  handleTodoChange: PropTypes.func.isRequired,
  handleMonthChange: PropTypes.func.isRequired
};