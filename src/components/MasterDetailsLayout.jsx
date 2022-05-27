import * as React from 'react';
import Grid from '@mui/material/Grid';

export default function MasterDetailsLayout(props) {
  return (
    <>
      <Grid item xs={5} md={4}>
        {props.master}
      </Grid>
      <Grid item xs={7} md={8}>
        {props.details}
      </Grid>
    </>
  );
}
