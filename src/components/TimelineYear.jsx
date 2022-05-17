import React from "react";
import TodoGridSnap from "./TodoGridSnap";

export default function TimelineYear(props) {
  return (
    <>
      {props.todos.map((todo, index) => (
        <TodoGridSnap key={index} todo={todo} />
      ))}
    </>
  );
}
