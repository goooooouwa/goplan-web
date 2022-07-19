import { Grid, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import momentPropTypes from 'react-moment-proptypes';
import SHARED_PROP_TYPES from 'utils/sharedPropTypes';
import TimelineSlider from 'components/TimelineSlider/TimelineSlider';
import { marksForYear } from 'utils/rangeCheck';

export default function ProjectYearSlider(props) {
  const targetDate = (props.project.targetDate !== null) ? moment(props.project.targetDate) : moment(null);
  const [marks, rangeMin, rangeMax] = marksForYear(props.selectedYear);

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