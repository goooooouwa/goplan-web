import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, screen, render } from '@testing-library/react';
import TodoItem from './TodoItem';
import { BrowserRouter } from 'react-router-dom';

const todo = {
  id: 1,
  projectId: 1,
  status: false,
  name: "Todo 1"
};

it('should show a todo item', () => {
  const component = renderer.create(
    <BrowserRouter>
      <TodoItem
        todo={todo}
        handleTodoChange={() => { }}
      />
    </BrowserRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('should display todo name', () => {
  render(
    <BrowserRouter>
      <TodoItem
        todo={todo}
        handleTodoChange={() => { }}
      />
    </BrowserRouter>
  );

  expect(screen.getByText(/Todo 1/)).toBeInTheDocument();
  expect(screen.getByRole('checkbox')).toBeInTheDocument();

  // expect(screen.getByRole('checkbox').checked).toBeFalsy();

  // fireEvent.click(screen.getByRole('checkbox'));

  // expect(await screen.getByRole('checkbox').checked).toBeTruthy();
});