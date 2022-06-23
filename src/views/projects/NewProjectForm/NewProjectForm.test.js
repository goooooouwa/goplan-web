import React from 'react';
import renderer from 'react-test-renderer';
import NewProjectForm from './NewProjectForm';

it('should show a new todo form', () => {
  const component = renderer.create(
    <NewProjectForm />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});