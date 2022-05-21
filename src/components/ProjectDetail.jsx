import React from "react";
import { Stack, Typography } from "@mui/material";

export default function ProjectDetail(props) {
  return (
    <>
      <Stack
        direction="column"
        spacing={2}
      >
        <Typography variant="h3" component="div" gutterBottom >
          Goal: {props.project.goalName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {props.project.targetDate}
        </Typography>
      </Stack>
    </>
  );
}
