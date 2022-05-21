import httpService from "httpService";
import React, { useEffect, useState } from "react";
import TodoList from "components/TodoList";
import { Typography } from "@mui/material";
import { useParams, Outlet } from "react-router-dom";
import MasterDetailsLayout from "components/MasterDetailsLayout";

export default function TodoListContainer() {
  const params = useParams();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let url = '/todos.json';
    if (params.projectId != null) {
      url += `?project_id=${params.projectId}`;
    }
    httpService.get(url)
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
  }, [params.projectId]);

  return (
    <>
      <main>
        <Typography variant="h3" component="div" gutterBottom>
          Todos
        </Typography>
        <MasterDetailsLayout
          master={
            <TodoList todos={todos} />
          }
          details={
            <Outlet />
          } />
      </main>
    </>
  );
}