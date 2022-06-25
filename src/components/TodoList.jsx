import { List } from "@mui/material";
import React from "react";
import TodoItem from "./TodoItem/TodoItem";

export default function TodoList(props) {
  return (
    <>
      <List component="nav">
        {props.todos
          .filter((todo) => {
            return todo.dependencies.length === 0;
          })
          .map((todo, index) => (
            <TodoItem key={index} todo={todo} handleTodoChange={props.handleTodoChange} />
          ))}
      </List>
    </>
  );
}
