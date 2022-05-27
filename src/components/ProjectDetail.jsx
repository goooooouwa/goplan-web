import React from "react";
import { Stack, Typography } from "@mui/material";
import moment from "moment";

export default function ProjectDetail(props) {
  return (
    <>
      <Stack
        direction="column"
        spacing={2}
      >
        <Typography variant="h2" component="div" gutterBottom >
          Goal: {props.project.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {(props.project.targetDate !== null) ? moment(props.project.targetDate).fromNow() : "Indefinitely"}
        </Typography>
      </Stack>
    </>
  );
}
