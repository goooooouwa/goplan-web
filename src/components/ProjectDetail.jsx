import React from "react";
import { Grid, Button, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import moment from "moment";

export default function ProjectDetail(props) {
  const params = useParams();
  return (
    <>
      <Stack
        spacing={2}
      >
        <Grid container>
          <Grid item xs={8}>
            <Typography variant="h3" component="div" gutterBottom >
              Goal: {props.project.name}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" component={RouterLink} to={`/projects/${params.projectId}/edit`} sx={{ maxWidth: 160 }}>
              Edit
            </Button>
          </Grid>
        </Grid>
        <Typography variant="body1" gutterBottom>
          {(props.project.targetDate !== null) ? moment(props.project.targetDate).fromNow() : "Indefinitely"}
        </Typography>
      </Stack>
    </>
  );
}
