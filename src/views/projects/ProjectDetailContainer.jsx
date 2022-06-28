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
  }, [params.projectId]);

  return (
    <>
      <Box sx={{ mt: 2 }} >
        <ProjectDetail project={project} />
      </Box>
      <Outlet />
    </>
  );
}
