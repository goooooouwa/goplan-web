import moment from "moment";

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
  
const todoTraversal = {
  markDirtyTodosAndDependents
};

export default todoTraversal;