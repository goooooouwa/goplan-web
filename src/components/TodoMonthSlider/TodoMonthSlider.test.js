import moment from 'moment';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import TodoMonthSlider from '../TodoMonthSlider/TodoMonthSlider';

const marks = [{
  value: 1,
  label: "Week 1"
}, {
  value: 2,
  label: "Week 2"
}, {
  value: 3,
  label: "Week 3"
}, {
  value: 4,
  label: "Week 4"
}, {
  value: 5,
  label: "Week 5"
}];


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
      <TodoMonthSlider todo={todo} marks={marks} selectedMonth={moment('2022-01-02')} handleTodoChange={() => { }} handleWeekChange={() => { }} />
    </BrowserRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});