import { Grid, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import momentPropTypes from 'react-moment-proptypes';
import SHARED_PROP_TYPES from 'utils/sharedPropTypes';
import TimelineSlider from 'components/TimelineSlider/TimelineSlider';

export default function ProjectYearSlider(props) {
  const targetDate = (props.project.targetDate !== null) ? moment(props.project.targetDate) : moment(null);
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
      return 13;
    }
  };

  return (
    <>
      <Grid item xs={12} md={4}>
        <Typography
          sx={{
            fontWeight: 'bold',
            color: 'text.secondary'
          }}
        >
          Goal: {props.project.name}
        </Typography>
      </Grid>
      <Grid item xs={12} md={8} sx={{ px: 3 }}>
        <TimelineSlider
          marks={marks}
          rangeMin={rangeMin}
          rangeMax={rangeMax}
          rangeStart={rangeMark(targetDate)}
          disableRangeStart={true}
          handleChangeCommited={() => {}}
        />
      </Grid>
    </>
  );
}

ProjectYearSlider.propTypes = {
  selectedYear: momentPropTypes.momentObj.isRequired,
  project: SHARED_PROP_TYPES.project,
};