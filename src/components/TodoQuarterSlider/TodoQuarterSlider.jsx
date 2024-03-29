import { Collapse, Grid } from '@mui/material';
import { isInQuarterRange, todosInQuarterRange } from 'utils/rangeCheck';
import moment from 'moment';
import React, { useEffect } from "react";
import TimelineRangeSlider from '../TimelineRangeSlider/TimelineRangeSlider';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import SHARED_PROP_TYPES from 'utils/sharedPropTypes';
import TodoItem from '../TodoItem/TodoItem';
import TimelineSlider from 'components/TimelineSlider/TimelineSlider';

export default function TodoQuarterSlider(props) {
  const startDate = (props.todo.startDate !== null) ? moment(props.todo.startDate) : moment();
  const endDate = (props.todo.endDate !== null) ? moment(props.todo.endDate) : moment();
  const [open, setOpen] = React.useState(false);
  const marks = [
    {
      value: 0,
      label: props.selectedQuarter.clone().startOf("quarter").format("MMM, YYYY"),
    },
    {
      value: 1,
      label: props.selectedQuarter.clone().startOf("quarter").add(1, "months").format("MMM, YYYY"),
    },
    {
      value: 2,
      label: props.selectedQuarter.clone().startOf("quarter").add(2, "months").format("MMM, YYYY"),
    },
  ];
  const rangeMin = 0;
  const rangeMax = marks.length - 1;

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
      if (date.isBefore(props.selectedQuarter.clone().startOf("quarter"))) {
        rangeMark = rangeMin;
      } else if (date.isAfter(props.selectedQuarter.clone().endOf("quarter"))) {
        rangeMark = rangeMax;
      } else {
        rangeMark = date.month() % 3;
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
            disableRangeStart={props.todo.status || !isInQuarterRange(startDate, props.selectedQuarter)}
            disableRangeEnd={props.todo.status || !isInQuarterRange(endDate, props.selectedQuarter)}
            handleChangeCommited={(newValue) => { props.handleMonthChange(props.todo, newValue) }}
          />
        }
        {!props.todo.repeat &&
          <TimelineSlider
            marks={marks}
            rangeMin={rangeMin}
            rangeMax={rangeMax}
            color={props.todo.color}
            rangeStart={rangeMark(startDate)}
            disableRangeStart={props.todo.status || !isInQuarterRange(startDate, props.selectedQuarter)}
            handleChangeCommited={(newValue) => { props.handleMonthChange(props.todo, newValue) }}
          />
        }
      </Grid>
      {!props.todo.status && props.todo.children.length > 0 &&
        <Grid item xs={12} md={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {props.todo.children.map((child, index) => (
              <Grid key={index} container item xs={12} md={12}>
                <TodoQuarterSlider key={index} todo={child} selectedQuarter={props.selectedQuarter} handleTodoChange={props.handleTodoChange} handleMonthChange={props.handleMonthChange} loadChildren={props.loadChildren} />
              </Grid>
            ))}
          </Collapse>
        </Grid>
      }
    </>
  );
}

TodoQuarterSlider.propTypes = {
  selectedQuarter: momentPropTypes.momentObj.isRequired,
  todo: SHARED_PROP_TYPES.todo,
  handleTodoChange: PropTypes.func.isRequired,
  loadChildren: PropTypes.func.isRequired,
  handleMonthChange: PropTypes.func.isRequired
};