import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function MasterDetailsLayout(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {props.master}
        </Grid>
        <Grid item xs={8}>
          {props.details}
        </Grid>
      </Grid>
    </Box>
  );
}
