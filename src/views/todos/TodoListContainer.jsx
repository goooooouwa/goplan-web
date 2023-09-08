import React, { useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import TodoListItem from "components/TodoListItem";
import { Container, Grid, Stack, Typography } from "@mui/material";
import TodoActionGroup from "components/TodoActionGroup";
import { useTranslation } from 'react-i18next';

export default function TodoListContainer() {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const todosUrl = params.projectId !== undefined ? `/todos.json?root=true&project_id=${params.projectId}` : '/todos.json?root=true';
  const [todos, _, updateTodoStatus, loadChildren, reloadTodos] = useOutletContext();

  useEffect(() => {
    reloadTodos(todosUrl);
  }, [todosUrl]);

  const handleTodoChange = (event, todo) => {
    updateTodoStatus(event, todo, () => { });
  };

  return (
    <>
      <Container sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h4" component="div">
                {t('Tasks')}
              </Typography>
              <TodoActionGroup activeViewTitle={t("List")} />
            </Stack>
          </Grid>
          {todos
            .map((todo, index) => (
              <TodoListItem key={index} todo={todo} handleTodoChange={handleTodoChange} loadChildren={loadChildren} />
            ))}
        </Grid>
      </Container>
    </>
  );
}