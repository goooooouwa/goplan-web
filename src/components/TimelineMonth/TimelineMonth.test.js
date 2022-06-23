import React from 'react';
import renderer from 'react-test-renderer';
import moment from 'moment';
import { BrowserRouter } from 'react-router-dom';
import TimelineMonth from './TimelineMonth';

const todos = [{
  id: 1,
  projectId: 1,
  status: false,
  repeat: true,
  name: "Todo 1",
  startDate: '2022-01-02',
  endDate: '2022-02-02',
  instanceTimeSpan: 1,
}];

it('should show a timeline Month view', () => {
  const component = renderer.create(
    <BrowserRouter>
      <TimelineMonth todos={todos} selectedMonth={moment('2022-02-01')} handleTodoChange={() => { }} handleWeekChange={() => { }} />
    </BrowserRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});