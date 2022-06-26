const markDirtyTodosAndDependents = (todos, updatedTodoId, { startDate, endDate }) => {
  return todos.map((todo) => {
    if (todo.id === updatedTodoId) {
      todo.startDate = startDate;
      todo.endDate = endDate;
    }
    if (todo.dependents.length > 0) {
      todo.dependents = markDirtyTodosAndDependents(todo.dependents, updatedTodoId, { startDate, endDate });
    }
    return todo;
  });
};
  
const flattenTodosAndDependents = (todos) => {
  return todos.map((todo) => {
    if (todo.dependents.length > 0) {
      return [todo, flattenTodosAndDependents(todo.dependents)].flat();
    } else {
      return todo;
    }
  });
};

const todoTraversal = {
  markDirtyTodosAndDependents
};

export default todoTraversal;