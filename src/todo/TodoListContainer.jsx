import httpService from "httpService";
import React, { useEffect, useState } from "react";
import TodoList from "components/TodoList";
import { Typography } from "@mui/material";

export default function TodosListContainer() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    httpService.get('/todos.json')
      .then((response) => {
        setTodos(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  return (
    <>
      <main>
        <Typography variant="h3" component="div" gutterBottom>
          Todos
        </Typography>
        <TodoList todos={todos} />
      </main>
    </>
  );
}