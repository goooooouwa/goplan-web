import { Collapse, Grid } from '@mui/material';
import { isInQuarterRange } from 'utils/rangeCheck';
import moment from 'moment';
import React from 'react';
import TimelineRangeSlider from '../TimelineRangeSlider/TimelineRangeSlider';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import SHARED_PROP_TYPES from 'utils/sharedPropTypes';
import TodoItem from '../TodoItem/TodoItem';
import TimelineSlider from 'components/TimelineSlider/TimelineSlider';

export default function TodoQuarterSlider(props) {
  const startDate = (props.todo.startDate !== null) ? moment(props.todo.startDate) : moment();
  const endDate = (props.todo.endDate !== null) ? moment(props.todo.endDate) : moment();
  const [open, setOpen] = React.useState(true);
  const rangeMin = 1;
  const rangeMax = props.marks.length;

  const handleTodoExpand = () => {
    setOpen(!open);
  };

  const rangeMark = (date) => {
    if (date.isValid()) {
      let rangeMark;
      if (date.isBefore(props.selectedQuarter.clone().startOf("quarter"))) {
        rangeMark = rangeMin;
      } else if (date.isAfter(props.selectedQuarter.clone().endOf("quarter"))) {
        rangeMark = rangeMax;
      } else {
        rangeMark = date.month() % 3 + 1;
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
            disableRangeStart={props.todo.status || !isInQuarterRange(startDate, props.selectedQuarter)}
            disableRangeEnd={props.todo.status || !isInQuarterRange(endDate, props.selectedQuarter)}
            handleChangeCommited={(newValue) => { props.handleMonthChange(props.todo, newValue) }}
          />
        }
        {!props.todo.repeat &&
          <TimelineSlider
            marks={props.marks}
            rangeMin={rangeMin}
            rangeMax={rangeMax}
            rangeStart={rangeMark(startDate)}
            disableRangeStart={props.todo.status || !isInQuarterRange(startDate, props.selectedQuarter)}
            handleChangeCommited={(newValue) => { props.handleMonthChange(props.todo, newValue) }}
          />
        }
      </Grid>
      {Array.isArray(props.todo.dependencies) && props.todo.dependencies.length > 0 &&
        <Grid item xs={12} md={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {props.todo.dependencies.map((dependent, index) => (
              <Grid key={index} container item xs={12} md={12}>
                <TodoQuarterSlider key={index} todo={dependent} marks={props.marks} selectedQuarter={props.selectedQuarter} handleTodoChange={props.handleTodoChange} handleMonthChange={props.handleMonthChange} />
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
  marks: SHARED_PROP_TYPES.marks,
  handleTodoChange: PropTypes.func.isRequired,
  handleMonthChange: PropTypes.func.isRequired
};