import { List } from "@mui/material";
import moment from "moment";
import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList(props) {
  return (
    <>
      <List>
        {props.todos
          .sort((t1, t2) => moment(t1.createdAt).isBefore(t2.createdAt) ? -1 : 1)
          .map((todo, index) => (
            <TodoItem key={index} todo={todo} handleTodoChange={props.handleTodoChange}/>
          ))}
      </List>
    </>
  );
}
