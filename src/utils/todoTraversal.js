import { cloneDeep } from "lodash";

const updateTodosAndDependencies = (todos, updatedTodo) => {
  return cloneDeep(todos).map((todo) => {
    if (todo.id === updatedTodo.id) {
      todo = updatedTodo;
    }
    if (todo.dependencies !== undefined && todo.dependencies.length > 0) {
      todo.dependencies = updateTodosAndDependencies(todo.dependencies, updatedTodo);
    }
    return todo;
  });
};

const updateTodosAndChildren = (todos, updatedTodo) => {
  return cloneDeep(todos).map((todo) => {
    if (todo.id === updatedTodo.id) {
      todo = updatedTodo;
    }
    if (todo.children !== undefined && todo.children.length > 0) {
      todo.children = updateTodosAndChildren(todo.children, updatedTodo);
    }
    return todo;
  });
};
  
const updateTodos = (todos, updatedTodo) => {
  return cloneDeep(todos).map((todo) => {
    if (todo.id === updatedTodo.id) {
      todo = updatedTodo;
    }
    return todo;
  });
};
  
const groupByProject = (todos) => {
  return todos.reduce((projects, todo) => ({
    ...projects,
    [todo.project.id]: [...(projects[todo.project.id] || []), todo]
  }), {});
};

const todoTraversal = {
  updateTodosAndDependencies,
  updateTodosAndChildren,
  updateTodos,
  groupByProject,
};

export default todoTraversal;