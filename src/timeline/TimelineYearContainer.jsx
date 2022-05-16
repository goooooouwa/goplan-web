import React, { useEffect, useState } from "react";
import httpService from "httpService";
import TimelineYearWithTodoList from "components/TimelineYearWithTodoList";

export default function TimelineYearPage() {
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
      <TimelineYearWithTodoList todos={todos} />
    </>
  );
}
