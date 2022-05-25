import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import TodoMonthSlider from './TodoMonthSlider';

const marks = [
  {
    value: 0,
    label: 'Jan',
  },
  {
    value: 1,
    label: 'Feb',
  },
  {
    value: 2,
    label: 'Mar',
  },
  {
    value: 3,
    label: 'Apr',
  },
  {
    value: 4,
    label: 'May',
  },
  {
    value: 5,
    label: 'Jun',
  },
  {
    value: 6,
    label: 'Jul',
  },
  {
    value: 7,
    label: 'Aug',
  },
  {
    value: 8,
    label: 'Sep',
  },
  {
    value: 9,
    label: 'Oct',
  },
  {
    value: 10,
    label: 'Nov',
  },
  {
    value: 11,
    label: 'Dec',
  },
];

export default function TimelineYear(props) {

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
            <Typography
              variant="body1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                textAlign: 'left',
                mt: 1,
                ml: 2
              }}
            >
              Todos
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box display={{ xs: 'none', md: 'block' }} m={1}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                {marks.map((mark, index) => (
                  <Typography
                    key={index}
                    variant="body1"
                    gutterBottom
                    sx={{
                      fontWeight: 'bold'
                    }}
                  >
                    {mark.label}
                  </Typography>
                ))}
              </Stack>
            </Box>
          </Grid>
          {props.todos
            .sort((t1, t2) => moment(t1.createdAt).isBefore(t2.createdAt) ? -1 : 1)
            .map((todo, index) => (
              <TodoMonthSlider key={index} todo={todo} />
            ))}
        </Grid>
      </Box>
    </>
  );
}
