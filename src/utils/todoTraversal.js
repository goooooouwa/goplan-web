const markDirtyTodosAndDependents = (todos, updatedTodo) => {
  return todos.map((todo) => {
    if (todo.id === updatedTodo.id) {
      todo = updatedTodo;
    }
    if (todo.dependents.length > 0) {
      todo.dependents = markDirtyTodosAndDependents(todo.dependents, updatedTodo);
    }
    return todo;
  });
};

const markDirtyTodosAndDependencies = (todos, updatedTodo) => {
  return todos.map((todo) => {
    if (todo.id === updatedTodo.id) {
      todo = updatedTodo;
    }
    if (todo.dependencies.length > 0) {
      todo.dependencies = markDirtyTodosAndDependencies(todo.dependencies, updatedTodo);
    }
    return todo;
  });
};
  
const todoTraversal = {
  markDirtyTodosAndDependents,
  markDirtyTodosAndDependencies
};

export default todoTraversal;