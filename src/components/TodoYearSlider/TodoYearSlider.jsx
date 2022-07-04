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

export default function TodoYearSlider(props) {
  const startDate = (props.todo.startDate !== null) ? moment(props.todo.startDate) : moment();
  const endDate = (props.todo.endDate !== null) ? moment(props.todo.endDate) : moment();
  const [open, setOpen] = React.useState(false);
  const marks = [
    {
      value: 0,
      label: props.selectedYear.clone().startOf("year").format("MMM, YYYY"),
    },
    {
      value: 1,
      label: props.selectedYear.clone().startOf("year").add(1, "months").format("MMM, YYYY"),
    },
    {
      value: 2,
      label: props.selectedYear.clone().startOf("year").add(2, "months").format("MMM, YYYY"),
    },
    {
      value: 3,
      label: props.selectedYear.clone().startOf("year").add(3, "months").format("MMM, YYYY"),
    },
    {
      value: 4,
      label: props.selectedYear.clone().startOf("year").add(4, "months").format("MMM, YYYY"),
    },
    {
      value: 5,
      label: props.selectedYear.clone().startOf("year").add(5, "months").format("MMM, YYYY"),
    },
    {
      value: 6,
      label: props.selectedYear.clone().startOf("year").add(6, "months").format("MMM, YYYY"),
    },
    {
      value: 7,
      label: props.selectedYear.clone().startOf("year").add(7, "months").format("MMM, YYYY"),
    },
    {
      value: 8,
      label: props.selectedYear.clone().startOf("year").add(8, "months").format("MMM, YYYY"),
    },
    {
      value: 9,
      label: props.selectedYear.clone().startOf("year").add(9, "months").format("MMM, YYYY"),
    },
    {
      value: 10,
      label: props.selectedYear.clone().startOf("year").add(10, "months").format("MMM, YYYY"),
    },
    {
      value: 11,
      label: props.selectedYear.clone().startOf("year").add(11, "months").format("MMM, YYYY"),
    },
  ];
  const rangeMin = 0;
  const rangeMax = marks.length - 1;

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
            marks={marks}
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
            marks={marks}
            rangeMin={rangeMin}
            rangeMax={rangeMax}
            rangeStart={rangeMark(startDate)}
            disableRangeStart={props.todo.status || !isInYearRange(startDate, props.selectedYear)}
            handleChangeCommited={(newValue) => { props.handleMonthChange(props.todo, newValue) }}
          />
        }
      </Grid>
      {Array.isArray(props.todo.children) && props.todo.children.length > 0 &&
        <Grid item xs={12} md={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {props.todo.children.map((child, index) => (
              <Grid key={index} container item xs={12} md={12}>
                <TodoYearSlider key={index} todo={child} selectedYear={props.selectedYear} handleTodoChange={props.handleTodoChange} handleMonthChange={props.handleMonthChange} />
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
  todo: SHARED_PROP_TYPES.todo,
  handleTodoChange: PropTypes.func.isRequired,
  handleMonthChange: PropTypes.func.isRequired
};