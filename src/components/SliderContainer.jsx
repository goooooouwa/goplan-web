import { Slider } from '@mui/material';
import React, { useState } from 'react';

function valuetext(value) {
  return value;
}

export default function SliderContainer(props) {
  const [value, setValue] = useState([props.start, props.end]);
  const minDistance = props.end - props.start;

  const valueLabelFormat = (value) => {
    const index = props.marks.findIndex((mark) => mark.value === value);
    if (index === -1) {
      return;
    }
    return props.marks[index].label;
  };

  const handleChangeCommitted = (event, newValue) => {
    props.handleChange(newValue);
  };

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue);
    }
  };

  return (
    <>
      <Slider
        valueLabelFormat={valueLabelFormat}
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={props.max}
      />
    </>
  );
}
