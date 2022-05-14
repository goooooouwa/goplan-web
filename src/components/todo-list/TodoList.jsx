import TodoItem from "components/todo-item/TodoItem";
import React from "react";

export default function TodoList(props) {
  const todos = props.todos;
  const todoItems = todos.map((todo, index) =>
    <TodoItem key={index} name={todo.name} />
  );
  return (
    <>
      <main>
        <h2>Todos</h2>
        <ul>
          {todoItems}
        </ul>
      </main>
    </>
  );
}
