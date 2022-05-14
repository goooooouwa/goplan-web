import ProjectList from "components/project-list/ProjectList";
import React from "react";

export default function ProjectListPage() {
  const projects = [
    {
      goalName: "goal #1"
    },
    {
      goalName: "goal #2"
    },
    {
      goalName: "goal #3"
    },
  ];
  return (
    <>
      <main>
        <h2>Projects</h2>
        <ProjectList projects={projects}/>
      </main>
    </>
  );
}
