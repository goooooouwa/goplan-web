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
  
const todoTraversal = {
  updateTodosAndDependencies
};

export default todoTraversal;