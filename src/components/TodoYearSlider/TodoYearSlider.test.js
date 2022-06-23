import moment from 'moment';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import TodoYearSlider from '../TodoYearSlider/TodoYearSlider';

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


const todo = {
  id: 1,
  projectId: 1,
  status: false,
  repeat: false,
  name: "Todo 1",
  startDate: '2022-01-02',
  endDate: '2022-01-02',
  instanceTimeSpan: 1,
};

it('should show a timeline slider', () => {
  const component = renderer.create(
    <BrowserRouter>
      <TodoYearSlider todo={todo} marks={marks} selectedYear={moment('2022-01-02')} handleTodoChange={() => { }} handleMonthChange={() => { }} />
    </BrowserRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});