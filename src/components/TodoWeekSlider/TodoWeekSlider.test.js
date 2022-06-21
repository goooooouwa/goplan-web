import moment from 'moment';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import TodoWeekSlider from './TodoWeekSlider';

const marks = [{
  value: 0,
  label: "Week 1"
}, {
  value: 1,
  label: "Week 2"
}, {
  value: 2,
  label: "Week 3"
}, {
  value: 3,
  label: "Week 4"
}, {
  value: 4,
  label: "Week 5"
}];

const todo = {
  id: 1,
  projectId: 1,
  status: false,
  name: "Todo 1",
  startDate: moment(),
  endDate: moment(),
  instanceTimeSpan: 1,
};

it('should show a timeline slider', () => {
  const component = renderer.create(
    <BrowserRouter>
      <TodoWeekSlider todo={todo} marks={marks} selectedWeek={moment()} handleTodoChange={() => { }} handleDayChange={() => { }} />
    </BrowserRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});