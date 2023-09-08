import { cloneDeep } from "lodash";

// const updateTodosAndDependencies = (todos, updatedTodo) => {
//   return cloneDeep(todos).map((todo) => {
//     if (todo.id === updatedTodo.id) {
//       todo = updatedTodo;
//     }
//     if (todo.dependencies !== undefined && todo.dependencies.length > 0) {
//       todo.dependencies = updateTodosAndDependencies(todo.dependencies, updatedTodo);
//     }
//     return todo;
//   });
// };

const changeAllOccurrencesOfTodoInTree = (todos, updatedTodo) => {
  return cloneDeep(todos).map((todo) => {
    if (todo.id === updatedTodo.id) {
      todo = updatedTodo;
    }
    if (todo.children !== undefined && todo.children.length > 0) {
      todo.children = changeAllOccurrencesOfTodoInTree(todo.children, updatedTodo);
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
  changeAllOccurrencesOfTodoInTree,
  groupByProject,
};

export default todoTraversal;