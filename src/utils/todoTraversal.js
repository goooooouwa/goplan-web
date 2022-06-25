const markDirtyTodosAndDepdents = (todos, updatedTodoId, { startDate, endDate }) => {
  return todos.map((todo) => {
    if (todo.id === updatedTodoId) {
      todo.startDate = startDate;
      todo.endDate = endDate;
    }
    if (todo.dependents.length > 0) {
      todo.dependents = markDirtyTodosAndDepdents(todo.dependents, updatedTodoId, { startDate, endDate });
    }
    return todo;
  });
};

const todoTraversal = {
  markDirtyTodosAndDepdents
};

export default todoTraversal;