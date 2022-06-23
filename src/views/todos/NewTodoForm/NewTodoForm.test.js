import React from 'react';
import renderer from 'react-test-renderer';
import NewTodoForm from './NewTodoForm';

it('should show a new todo form', () => {
  const component = renderer.create(
    <NewTodoForm />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});