import { Grid, Slider, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import momentPropTypes from 'react-moment-proptypes';
import SHARED_PROP_TYPES from 'utils/sharedPropTypes';
import isInYearRange, { marksForYear } from 'utils/rangeCheck';
import { useTranslation } from 'react-i18next';

function valuetext(value) {
  return value;
}

export default function ProjectYearSlider(props) {
  const { t, i18n } = useTranslation();
  const targetDate = (props.project.targetDate !== null) ? moment(props.project.targetDate) : moment(null);
  const [marks, rangeMin, rangeMax] = marksForYear(props.selectedYear);

  const valueLabelFormat = (value) => {
    return targetDate.format("MMM DD, YYYY");
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
          {t('Goal: ')}{props.project.name}
        </Typography>
      </Grid>
      <Grid item xs={12} md={8} sx={{ px: 3 }}>
        <Slider
          valueLabelFormat={valueLabelFormat}
          value={rangeMark(targetDate)}
          disabled={!isInYearRange(targetDate, props.selectedYear)}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          step={1}
          min={rangeMin}
          max={rangeMax}
          sx={{
            '& .MuiSlider-track': {
              display: 'none',
            },
            '& .MuiSlider-thumb': {
              color: isInYearRange(targetDate, props.selectedYear) ? 'error.main' : 'primary',
            },
            '& .MuiSlider-rail': {
              color: '#bdbdbd',
            },
          }}
        />
      </Grid>
    </>
  );
}

ProjectYearSlider.propTypes = {
  selectedYear: momentPropTypes.momentObj.isRequired,
  project: SHARED_PROP_TYPES.project,
};