import styled from '@emotion/styled';
import { Stack } from '@mui/material';
import React from 'react';
import TodoMonthSlider from './TodoMonthSlider';

const MonthColumn = styled.div`
  width: "100px";
  height: "50px";
  font-size: "1.2em";
`;

const YearAxis = styled(Stack)`
`;

const TimelineBox = styled.div`
  padding: 32px;
`;

export default function TimelineYear(props) {


  return (
    <>
      <TimelineBox>
        <YearAxis
          direction="row"
          justifyContent="space-between"
          alignItems="stretch"
        >
          <MonthColumn>Jan</MonthColumn>
          <MonthColumn>Feb</MonthColumn>
          <MonthColumn>Mar</MonthColumn>
          <MonthColumn>Apr</MonthColumn>
          <MonthColumn>May</MonthColumn>
          <MonthColumn>Jun</MonthColumn>
          <MonthColumn>Jul</MonthColumn>
          <MonthColumn>Aug</MonthColumn>
          <MonthColumn>Sep</MonthColumn>
          <MonthColumn>Oct</MonthColumn>
          <MonthColumn>Nov</MonthColumn>
          <MonthColumn>Dec</MonthColumn>
        </YearAxis>
        {props.todos.map((todo, index) => (
          <Stack
            key={index}
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <TodoMonthSlider todo={todo} />
          </Stack>
        ))}
      </TimelineBox>
    </>
  );
}
