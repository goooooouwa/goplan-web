import React from "react";
import { Typography } from "@mui/material";

export default function ProjectDetails(props) {
  return (
    <>
      <main>
        <Typography variant="h4" component="div" gutterBottom>
          Goal: {props.project.goalName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {props.project.targetDate}
        </Typography>
        <Typography variant="body1" component="div" gutterBottom>
          Todos
        </Typography>
      </main>
    </>
  );
}
