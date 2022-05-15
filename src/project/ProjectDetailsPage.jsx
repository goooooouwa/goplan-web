import ProjectDetails from "components/project-details/ProjectDetails";
import React from "react";
import { useParams } from "react-router-dom";

export default function ProjectDetailsPage() {
  const params = useParams();
  return <ProjectDetails id={params.projectId} />
}
