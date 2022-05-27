import { Slider } from '@mui/material';
import React, { useState } from 'react';

function valuetext(value) {
  return value;
}

export default function SliderContainer(props) {
  const [value, setValue] = useState([props.start, props.end]);

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
    setValue(newValue);
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
