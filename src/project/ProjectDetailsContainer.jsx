import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import httpService from "httpService";
import ProjectDetails from "components/ProjectDetails";

export default function ProjectDetailsContainer() {
  const params = useParams();
  const [project, setProject] = useState({
    goalName: "",
    targetDate: "",
    todos: []
  });

  useEffect(() => {
    httpService.get(`/projects/${params.projectId}.json`)
      .then((response) => {
        setProject(response.data);
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
      <ProjectDetails project={project} />
      <Outlet />
    </>
  );
}
