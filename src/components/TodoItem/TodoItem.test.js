import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, screen, render } from '@testing-library/react';
import TodoItem from './TodoItem';
import { BrowserRouter } from 'react-router-dom';
import moment from 'moment';

const todo = {
  id: 1,
  projectId: 1,
  status: false,
  name: "Todo 1",
  startDate: '2022-01-02',
  endDate: '2022-02-02',
  instanceTimeSpan: 1,
};

it('should show a todo item', () => {
  const component = renderer.create(
    <BrowserRouter>
      <TodoItem
        todo={todo}
        handleTodoChange={() => {}}
      />
    </BrowserRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('should display a todo with checkbox', () => {
  const handleTodoChange = jest.fn();
  render(
    <BrowserRouter>
      <TodoItem
        todo={todo}
        handleTodoChange={handleTodoChange}
      />
    </BrowserRouter>
  );

  expect(screen.getByText(/Todo 1/)).toBeInTheDocument();
  expect(screen.getByRole('checkbox')).toBeInTheDocument();
});

it('should call #handleTodoChange when checkbox clicked', () => {
  const handleTodoChange = jest.fn();
  render(
    <BrowserRouter>
      <TodoItem
        todo={todo}
        handleTodoChange={handleTodoChange}
      />
    </BrowserRouter>
  );

  fireEvent.click(screen.getByRole('checkbox'));
  expect(handleTodoChange).toHaveBeenCalledTimes(1);
});