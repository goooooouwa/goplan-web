import { List } from "@mui/material";
import moment from "moment";
import React from "react";
import TodoItem from "./TodoItem/TodoItem";

export default function TodoList(props) {
  return (
    <>
      <List>
        {props.todos.map((todo, index) => (
            <TodoItem key={index} todo={todo} handleTodoChange={props.handleTodoChange}/>
          ))}
      </List>
    </>
  );
}
