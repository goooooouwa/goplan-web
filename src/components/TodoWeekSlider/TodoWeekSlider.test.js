import moment from 'moment';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import TodoWeekSlider from './TodoWeekSlider';

const marks = [
  {
    value: 0,
    label: 'Sun',
  },
  {
    value: 1,
    label: 'Mon',
  },
  {
    value: 2,
    label: 'Tue',
  },
  {
    value: 3,
    label: 'Wed',
  },
  {
    value: 4,
    label: 'Thu',
  },
  {
    value: 5,
    label: 'Fri',
  },
  {
    value: 6,
    label: 'Sat',
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
      <TodoWeekSlider todo={todo} marks={marks} selectedWeek={moment('2022-01-02')} handleTodoChange={() => { }} handleDayChange={() => { }} />
    </BrowserRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});