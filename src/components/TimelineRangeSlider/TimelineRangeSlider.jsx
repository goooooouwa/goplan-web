import { Slider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SHARED_PROP_TYPES from 'utils/sharedPropTypes';
import { useLoading } from 'hooks/useLoading';

function valuetext(value) {
  return value;
}

export default function TimelineRangeSlider(props) {
  const [value, setValue] = useState([props.rangeStart, props.rangeEnd]);
  const { loading } = useLoading();

  const valueLabelFormat = (value) => {
    const index = props.marks.findIndex((mark) => mark.value === value);
    if (index === -1) {
      return;
    }
    return props.marks[index].label;
  };

  const handleChangeCommitted = (event, newValue) => {
    props.handleChangeCommited(filteredRangeValue(newValue));
  };

  const filteredRangeValue = (newValue) => {
    let [filteredRangeStart, filterRangeEnd] = value;
    if (!props.disableRangeStart) {
      filteredRangeStart = newValue[0];
    }
    if (!props.disableRangeEnd) {
      filterRangeEnd = newValue[1];
    }
    return [filteredRangeStart, filterRangeEnd];
  };

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    setValue(filteredRangeValue(newValue));
  };

  useEffect(() => {
    setValue([props.rangeStart, props.rangeEnd]);
  }, [props.rangeStart, props.rangeEnd]);

  return (
    <>
      <Slider
        valueLabelFormat={valueLabelFormat}
        value={value}
        disabled={props.disableRangeStart && props.disableRangeEnd}
        onChange={loading ? ()=>{} : handleChange}
        onChangeCommitted={loading ? ()=>{} : handleChangeCommitted}
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

TimelineRangeSlider.propTypes = {
  rangeMin: PropTypes.number.isRequired,
  rangeMax: PropTypes.number.isRequired,
  rangeStart: PropTypes.number.isRequired,
  rangeEnd: PropTypes.number.isRequired,
  disableRangeStart: PropTypes.bool,
  disableRangeEnd: PropTypes.bool,
  marks: SHARED_PROP_TYPES.marks,
  handleChangeCommited: PropTypes.func.isRequired
};