import React from "react";
import moment from 'moment'
import GridSnap from "./GridSnap";

export default function TodoGridSnap(props) {
  const todo = props.todo;
  let month = moment(todo.createdAt).isValid() ? moment(todo.createdAt).month() : 0;

  return (
    <>
      <GridSnap title={todo.name} column={month} />
    </>
  );
}
