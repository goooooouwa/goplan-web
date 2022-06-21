import { Slider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SHARED_PROP_TYPES from 'utils/sharedPropTypes';

function valuetext(value) {
  return value;
}

export default function TimelineSlider(props) {
  const [value, setValue] = useState([props.rangeStart, props.rangeEnd]);

  const valueLabelFormat = (value) => {
    const index = props.marks.findIndex((mark) => mark.value === value);
    if (index === -1) {
      return;
    }
    return props.marks[index].label;
  };

  const handleChangeCommitted = (event, newValue) => {
    props.handleChangeCommited(value);
  };

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      if (!props.disableRangeStart) {
        setValue(newValue);
      }
    } else {
      if (!props.disableRangeEnd) {
        setValue(newValue);
      }
    }
  };

  useEffect(()=>{
    setValue([props.rangeStart, props.rangeEnd]);
  },[props.rangeStart, props.rangeEnd]);

  return (
    <>
      <Slider
        valueLabelFormat={valueLabelFormat}
        value={value}
        disabled={props.disableRangeStart && props.disableRangeEnd}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={props.rangeMin}
        max={props.rangeMax}
      />
    </>
  );
}

TimelineSlider.propTypes = {
  rangeMin: PropTypes.number.isRequired,
  rangeMax: PropTypes.number.isRequired,
  rangeStart: PropTypes.number.isRequired,
  rangeEnd: PropTypes.number.isRequired,
  disableRangeStart: PropTypes.bool,
  disableRangeEnd: PropTypes.bool,
  marks: SHARED_PROP_TYPES.marks,
  handleChangeCommited: PropTypes.func.isRequired
};