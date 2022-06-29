import React from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import moment from "moment";

export default function ProjectDetail(props) {
  const params = useParams();
  return (
    <>
      <Stack
        spacing={2}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h3" component="div">
            Goal: {props.project.name}
          </Typography>
          <IconButton component={RouterLink} to={`/projects/${params.projectId}/edit`} sx={{ maxWidth: 160 }}>
            <EditIcon />
          </IconButton>
        </Stack>
        <Stack alignItems="center">
          <Typography variant="body1" gutterBottom>
            {(props.project.targetDate !== null) ? moment(props.project.targetDate).fromNow() : "Indefinitely"}
          </Typography>
        </Stack>
      </Stack>
    </>
  );
}
