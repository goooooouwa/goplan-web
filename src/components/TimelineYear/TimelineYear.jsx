import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import isInYearRange, { marksForYear, todosInYearRange } from 'utils/rangeCheck';
import moment from 'moment';
import React, { Fragment } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import SHARED_PROP_TYPES from 'utils/sharedPropTypes';
import TodoYearSlider from '../TodoYearSlider/TodoYearSlider';
import ProjectYearSlider from 'components/ProjectYearSlider/ProjectYearSlider';
import todoTraversal from 'utils/todoTraversal';
import { useTranslation } from 'react-i18next';
import TimelineEmpty from 'components/TimelineEmpty/TimelineEmpty';

export default function TimelineYear(props) {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const monthUrlPrefix = params.projectId !== undefined ? `/projects/${params.projectId}/timeline/month?month=` : '/timeline/month?month=';
  const [marks] = marksForYear(props.selectedYear);
  const todosByProject = todoTraversal.groupByProject(props.todos);

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
            {t('Tasks')}
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box display='block' m={1}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {marks.map((mark, index) => (
                <IconButton
                  key={index}
                  component={RouterLink}
                  size="small"
                  to={`${monthUrlPrefix}${props.selectedYear.clone().add(mark.value, "months").format("YYYY-MM-DD")}`}
                  sx={{
                    fontWeight: 'bold',
                    fontSize: { xs: 10, sm: 16 },
                    color: (isInYearRange(moment(), props.selectedYear) && moment().month() === index) ? 'error.main' : 'text.primary'
                  }}
                >
                  {mark.headerLabel}
                </IconButton>
              ))}
            </Stack>
          </Box>
        </Grid>
        {Object.entries(todosByProject).map(([_, todos], index) => (
          <Fragment key={index}>
            {todos.length > 0 &&
              <ProjectYearSlider project={todos[0].project} selectedYear={props.selectedYear} />
            }
            {todos.map((todo, index) => (
              <TodoYearSlider key={todo.id} todo={todo} selectedYear={props.selectedYear} handleTodoChange={props.handleTodoChange} handleMonthChange={props.handleMonthChange} loadChildren={props.loadChildren} />
            ))}
          </Fragment>
        ))}
        <TimelineEmpty isEmpty={Object.keys(todosByProject).length === 0} />
      </Grid>
    </>
  );
}

TimelineYear.propTypes = {
  selectedYear: momentPropTypes.momentObj.isRequired,
  todos: PropTypes.arrayOf(SHARED_PROP_TYPES.todo).isRequired,
  handleTodoChange: PropTypes.func.isRequired,
  loadChildren: PropTypes.func.isRequired,
  handleMonthChange: PropTypes.func.isRequired
};