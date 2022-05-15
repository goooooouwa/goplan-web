import ProjectItem from "components/project-item/ProjectItem";
import React from "react";

export default function ProjectList(props) {
  const projects = props.projects;
  const projectItems = projects.map((project, index) =>
    <ProjectItem key={index} {...project} />
  );
  return (
    <>
      <main>
        <h2>Projects</h2>
        <ul>
          {projectItems}
        </ul>
      </main>
    </>
  );
}
