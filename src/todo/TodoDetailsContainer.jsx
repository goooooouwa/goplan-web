import TodoDetails from "components/TodoDetails";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import httpService from "httpService";

export default function TodoDetailsContainer() {
  const params = useParams();
  const [todo, setTodo] = useState({
    projectId: "",
    name: "",
    description: "",
    timeSpan: "",
    startDate: "",
    endDate: "",
    repeat: false,
    repeatPeriod: "week",
    repeatTimes: 0,
    instanceTimeSpan: "",
    dependencies: [],
    dependents: []
  });

  useEffect(() => {
    httpService.get(`/todos/${params.todoId}.json`)
      .then((response) => {
        setTodo(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [params.todoId]);

  return (
    <>
      <TodoDetails todo={todo} />
    </>
  );
}
