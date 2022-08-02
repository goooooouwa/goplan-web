import { Slider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SHARED_PROP_TYPES from 'utils/sharedPropTypes';
import { useLoading } from 'hooks/useLoading';

function valuetext(value) {
  return value;
}

export default function TimelineSlider(props) {
  const [value, setValue] = useState(props.rangeStart);
  const { loading } = useLoading();

  const valueLabelFormat = (value) => {
    const index = props.marks.findIndex((mark) => mark.value === value);
    if (index === -1) {
      return;
    }
    return props.marks[index].label;
  };

  const handleChangeCommitted = (event, newValue) => {
    if (typeof props.handleChangeCommited === 'function') {
      const filterRangeStart = filteredRangeValue(newValue);
      props.handleChangeCommited([filterRangeStart, filterRangeStart]);
    }
  };

  const filteredRangeValue = (newValue) => {
    let filteredRangeStart = value;
    if (!props.disableRangeStart) {
      filteredRangeStart = newValue;
    }
    return filteredRangeStart;
  };

  const handleChange = (event, newValue, activeThumb) => {
    setValue(filteredRangeValue(newValue));
  };

  useEffect(() => {
    setValue(props.rangeStart);
  }, [props.rangeStart]);

  return (
    <>
      <Slider
        valueLabelFormat={valueLabelFormat}
        value={value}
        onChange={loading ? ()=>{} : handleChange}
        onChangeCommitted={loading ? ()=>{} : handleChangeCommitted}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={props.rangeMin}
        max={props.rangeMax}
        sx={{
          '& .MuiSlider-track': {
            display: 'none',
          },
        }}
      />
    </>
  );
}

TimelineSlider.propTypes = {
  rangeMin: PropTypes.number.isRequired,
  rangeMax: PropTypes.number.isRequired,
  rangeStart: PropTypes.number.isRequired,
  disableRangeStart: PropTypes.bool,
  marks: SHARED_PROP_TYPES.marks,
  handleChangeCommited: PropTypes.func
};