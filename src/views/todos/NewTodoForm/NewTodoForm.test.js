import React from 'react';
import { render } from '@testing-library/react';
import NewTodoForm from './NewTodoForm';

it('should show a new todo form', () => {
  const view = render(
    <NewTodoForm />
  );
  expect(view).toMatchSnapshot();
});