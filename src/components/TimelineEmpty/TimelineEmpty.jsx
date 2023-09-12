import { Grid, Stack, Typography } from "@mui/material";
import { useLoading } from "hooks/useLoading";
import { useTranslation } from 'react-i18next';
import React from "react";
import PropTypes from 'prop-types';

export default function TimelineEmpty(props) {
  const { t, i18n } = useTranslation();
  const { loading } = useLoading();

  return <>
    {!loading && props.isEmpty &&
      <Grid item xs={12}>
        <Stack alignItems="center" justifyContent="center" sx={{ height: 200 }}>
          <Typography alignItems="center">
            {t('No tasks in selected time range')}
          </Typography>
        </Stack>
      </Grid>
    }
  </>
}

TimelineEmpty.propTypes = {
  isEmpty: PropTypes.bool.isRequired
};