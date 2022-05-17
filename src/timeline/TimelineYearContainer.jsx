import React, { useEffect, useState } from "react";
import httpService from "httpService";
import TimelineYear from "components/TimelineYear";
import { useParams } from "react-router-dom";

export default function TimelineYearPage() {
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
      <TimelineYear todos={todos} />
    </>
  );
}
