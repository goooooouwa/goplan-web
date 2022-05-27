import { Slider } from '@mui/material';
import React, { useState } from 'react';

function valuetext(value) {
  return value;
}

export default function SliderContainer(props) {
  const [value, setValue] = useState([props.rangeStart, props.rangeEnd]);

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
        min={props.rangeMin}
        max={props.rangeMax}
      />
    </>
  );
}
