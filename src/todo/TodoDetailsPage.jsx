import TodoDetails from "components/todo-details/TodoDetails";
import React from "react";
import { useParams } from "react-router-dom";

export default function TodoDetailsPage() {
  const params = useParams();
  return <TodoDetails id={params.todoId} />
}
