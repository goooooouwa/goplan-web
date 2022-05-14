import TodoList from "components/todo-list/TodoList";
import React from "react";

export default function TodosListPage() {
  const todos = [
    {
      name: "abc"
    },
    {
      name: "def"
    },
    {
      name: "xyz"
    },
  ];
  return (
    <>
      <main>
        <h2>Todos</h2>
        <TodoList todos={todos}/>
      </main>
    </>
  );
}
