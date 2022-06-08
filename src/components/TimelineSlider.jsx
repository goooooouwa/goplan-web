import { Slider } from '@mui/material';
import React, { useEffect, useState } from 'react';

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
