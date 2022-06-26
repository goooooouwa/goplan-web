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
  
const flattenTodosAndDependents = (todos) => {
  return todos.map((todo) => {
    if (todo.dependents.length > 0) {
      return [todo, flattenTodosAndDependents(todo.dependents)].flat();
    } else {
      return todo;
    }
  }).flat();
};

const queryTodoInTodosAndDependents = (todos, todoId) => {
  return flattenTodosAndDependents(todos).filter((todo) => {
    return todo.id === todoId;
  });
};

const hasEarliestDependentAmongOpenTodosAndDependents = (todos, todo) => {
  const earlierOpenTodos = todos.filter((todo) => {
    return todo.status === false;
  }).filter((openTodo) => {
    return moment(openTodo.createdAt).isBefore(todo.createdAt);
  });

  return todo.dependents.some((dependent) => {
    return queryTodoInTodosAndDependents(earlierOpenTodos, dependent.id).length === 0;
  });
};

const todoTraversal = {
  markDirtyTodosAndDependents,
  hasEarliestDependentAmongOpenTodosAndDependents
};

export default todoTraversal;