import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import { isInMonthRange } from 'lib/rangeCheck';
import moment from 'moment';
import React from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import TodoMonthSlider from './TodoMonthSlider';

const marks = [
  {
    value: 1,
    label: 'Week 1',
  },
  {
    value: 2,
    label: 'Week 2',
  },
  {
    value: 3,
    label: 'Week 3',
  },
  {
    value: 4,
    label: 'Week 4',
  },
  {
    value: 5,
    label: 'Week 5',
  },
];

export default function TimelineMonth(props) {
  const params = useParams();
  const weekUrlPrefix = params.projectId !== undefined ? `/projects/${params.projectId}/week?week=` : '/timeline/week?week=';

  return (
    <>
      <Grid container rowSpacing={1} >
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
          <Box m={1}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {marks.map((mark, index) => (
                <Stack key={index}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: (isInMonthRange(moment(), props.selectedMonth) && (Math.ceil(moment().date() / 7) === index)) ? 'error.main' : 'text.primary'
                    }}
                  >
                    {mark.label}
                  </Typography>
                  <IconButton
                    key={index}
                    component={RouterLink}
                    size="small"
                    to={`${weekUrlPrefix}${props.selectedMonth.clone().add(mark.value, "weeks").format("YYYY[W]WW")}`}
                    sx={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      color: (isInMonthRange(moment(), props.selectedMonth) && (Math.ceil(moment().date() / 7) === index)) ? 'error.main' : 'text.primary'
                    }}
                  >
                    {`${props.selectedMonth.clone().startOf("month").add(mark.value - 1, "weeks").format("D")} - ${moment.min(props.selectedMonth.clone().startOf("month").add(mark.value - 1, "weeks").add(6, "days"), props.selectedMonth.clone().endOf("month")).format("D")}`}
                  </IconButton>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Grid>
        {props.todos
          .sort((t1, t2) => moment(t1.createdAt).isBefore(t2.createdAt) ? -1 : 1)
          .map((todo, index) => (
            <TodoMonthSlider key={index} todo={todo} marks={marks} selectedMonth={props.selectedMonth} />
          ))}
      </Grid>
    </>
  );
}
