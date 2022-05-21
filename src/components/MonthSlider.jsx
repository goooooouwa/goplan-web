import { Slider } from '@mui/material';
import React, { useState } from 'react';

const marks = [
  {
    value: 0,
    label: 'Jan',
  },
  {
    value: 1,
    label: 'Feb',
  },
  {
    value: 2,
    label: 'Mar',
  },
  {
    value: 3,
    label: 'Apr',
  },
  {
    value: 4,
    label: 'May',
  },
  {
    value: 5,
    label: 'Jun',
  },
  {
    value: 6,
    label: 'Jul',
  },
  {
    value: 7,
    label: 'Aug',
  },
  {
    value: 8,
    label: 'Sep',
  },
  {
    value: 9,
    label: 'Oct',
  },
  {
    value: 10,
    label: 'Nov',
  },
  {
    value: 11,
    label: 'Dec',
  },
];

function valuetext(value) {
  return value;
}

function valueLabelFormat(value) {
  const index = marks.findIndex((mark) => mark.value === value);
  if (index === -1) {
    return;
  }
  return marks[index].label;
}

export default function MonthSlider(props) {
  const [value, setValue] = useState([props.startMonth, props.endMonth]);
  const minDistance = props.endMonth - props.startMonth;

  const handleChangeCommitted = (event, newValue) => {
    props.handleMonthChange(newValue);
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
        getAriaLabel={() => 'Month range slider'}
        valueLabelFormat={valueLabelFormat}
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={11}
      />
    </>
  );
}
