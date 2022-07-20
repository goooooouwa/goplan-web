import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import httpService from "services/httpService";
import ProjectDetail from "components/ProjectDetail";
import { Box } from "@mui/material";
import { useAPIError } from "hooks/useAPIError";

export default function ProjectDetailContainer() {
  const params = useParams();
  const [project, setProject] = useState({
    name: "",
    targetDate: "",
    todos: []
  });
  const { addError } = useAPIError();

  const handleProjectDestroy = (projectId, callback) => {
    httpService.delete(`/projects/${projectId}.json`)
      .then((response) => {
        callback();
      })
      .catch(function (error) {
        addError(error.response.data, error.response.status);
        console.log(error);
      });
  };

  useEffect(() => {
    httpService.get(`/projects/${params.projectId}.json`)
      .then((response) => {
        setProject(response.data);
      })
      .catch(function (error) {
        // handle error
        addError(error.response.data, error.response.status);
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [params.projectId, addError]);

  return (
    <>
      <Box sx={{ mt: 2 }} >
        <ProjectDetail project={project} handleProjectDestroy={handleProjectDestroy} />
      </Box>
      <Outlet />
    </>
  );
}
