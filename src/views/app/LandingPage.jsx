import { Button, Container, Grid, Link, Stack, Typography } from "@mui/material";
import React from "react";
import ReactPlayer from 'react-player/file'
import { Navigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import TaskAlt from "@mui/icons-material/TaskAlt";
import { useTranslation } from 'react-i18next';

const StorageServiceBaseURL = process.env.REACT_APP_STORAGE_SERVICE_BASE_URL;

export default function LandingPage() {
  const { t, i18n } = useTranslation();
  const { getAccessToken, signInPage, handleOfflineMode } = useAuth();

  return (
    <>
      {getAccessToken() !== null &&
        <Navigate to="/" />
      }
      <Container sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center">
              <TaskAlt fontSize="large" sx={{mr: 0 }} color="success" />
              <Typography variant="h3" color="text.primary" >
                {t('GoPlan')}
              </Typography>
            </Stack>
            <h2>{t('Where plans meet their timeline.')}</h2>
            <p>{t('GoPlan is an app to help you achieve your goals, by turning your plan into actionable tasks that can be easily managed over time with a timeline overview.')}</p>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" component={Link} href={signInPage}>
              {t('Start using GoPlan')}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" onClick={handleOfflineMode}>
              {t('Try it first')}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <ReactPlayer url={`${StorageServiceBaseURL}/static/videos/goplan/auto-planning.mp4`} controls={true} muted={true} playing={true} loop={true} width='100%' height='auto' />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
