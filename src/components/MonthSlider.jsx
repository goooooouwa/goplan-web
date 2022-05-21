import { Slider } from '@mui/material';
import React, { useState } from 'react';

const marks = [
    {
      value: 1,
      label: 'Jan',
    },
    {
      value: 2,
      label: 'Feb',
    },
    {
      value: 3,
      label: 'Mar',
    },
    {
      value: 4,
      label: 'Apr',
    },
    {
      value: 5,
      label: 'May',
    },
    {
      value: 6,
      label: 'Jun',
    },
    {
      value: 7,
      label: 'Jul',
    },
    {
      value: 8,
      label: 'Aug',
    },
    {
      value: 9,
      label: 'Sep',
    },
    {
      value: 10,
      label: 'Oct',
    },
    {
      value: 11,
      label: 'Nov',
    },
    {
      value: 12,
      label: 'Dec',
    },
  ];
  
  function valuetext(value) {
    return value;
  }
  
  function valueLabelFormat(value) {
    const index = marks.findIndex((mark) => mark.value === value);
    if (index == -1) {
      return;
    }
    return marks[index].label;
  }
  
  export default function MonthSlider(props) {
    const [value, setValue] = useState([props.startMonth, props.endMonth]);
    const minDistance = props.endMonth - props.startMonth;
  
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
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={12}
            disableSwap
        />
    </>
    );
}
