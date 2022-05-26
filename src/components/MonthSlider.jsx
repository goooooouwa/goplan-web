import { Slider } from '@mui/material';
import React, { useState } from 'react';
import { styled } from '@mui/system';
import moment from 'moment';

const CustomSlider = styled(Slider)({
  '@media only screen and (min-width: 900px)': {
    '& .MuiSlider-markLabel': { 
      display: 'none'
    } 
  },
  '& .MuiSlider-markLabel[data-index="0"]': {
    color: (moment().month() === 0) ? 'red': 'black'
  },
  '& .MuiSlider-markLabel[data-index="1"]': {
    color: (moment().month() === 1) ? 'red': 'black'
  },
  '& .MuiSlider-markLabel[data-index="2"]': {
    color: (moment().month() === 2) ? 'red': 'black'
  },
  '& .MuiSlider-markLabel[data-index="3"]': {
    color: (moment().month() === 3) ? 'red': 'black'
  },
  '& .MuiSlider-markLabel[data-index="4"]': {
    color: (moment().month() === 4) ? 'red': 'black'
  },
  '& .MuiSlider-markLabel[data-index="5"]': {
    color: (moment().month() === 5) ? 'red': 'black'
  },
  '& .MuiSlider-markLabel[data-index="6"]': {
    color: (moment().month() === 6) ? 'red': 'black'
  },
  '& .MuiSlider-markLabel[data-index="7"]': {
    color: (moment().month() === 7) ? 'red': 'black'
  },
  '& .MuiSlider-markLabel[data-index="8"]': {
    color: (moment().month() === 8) ? 'red': 'black'
  },
  '& .MuiSlider-markLabel[data-index="9"]': {
    color: (moment().month() === 9) ? 'red': 'black'
  },
  '& .MuiSlider-markLabel[data-index="10"]': {
    color: (moment().month() === 10) ? 'red': 'black'
  },
  '& .MuiSlider-markLabel[data-index="11"]': {
    color: (moment().month() === 11) ? 'red': 'black'
  },
});

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
      <CustomSlider
        getAriaLabel={() => 'Month range slider'}
        valueLabelFormat={valueLabelFormat}
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={1}
        marks={marks}
        min={0}
        max={11}
      />
    </>
  );
}
