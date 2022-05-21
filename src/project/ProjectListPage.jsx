import { Typography } from "@mui/material";
import ProjectList from "components/ProjectList";
import httpService from "httpService";
import React, { useEffect, useState } from "react";

export default function ProjectListContainer() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    httpService.get('/projects.json')
      .then((response) => {
        setProjects(response.data);
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
          Projects
        </Typography>
        <ProjectList projects={projects} />
      </main>
    </>
  );
}
