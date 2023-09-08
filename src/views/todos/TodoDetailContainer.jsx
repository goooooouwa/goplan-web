import TodoDetail from "components/TodoDetail";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import httpService from "services/httpService";
import { Container } from "@mui/material";
import { useAPIError } from "hooks/useAPIError";
import todoTraversal from "utils/todoTraversal";

export default function TodoDetailContainer() {
  const params = useParams();
  const [todo, setTodo] = useState({
    id: 0,
    projectId: 0,
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    repeat: false,
    repeatPeriod: "",
    repeatTimes: 0,
    instanceTimeSpan: 1,
    status: false,
    numberOfDependencies: 0,
    numberOfDependents: 0,
    numberOfChildren: 0,
    numberOfParents: 0,
    dependencies: [],
    dependents: [],
    children: [],
    parents: []
  });
  const { addError } = useAPIError();

  useEffect(() => {
    httpService.get(`/todos/${params.todoId}.json`)
      .then((response) => {
        setTodo(response.data);
      })
      .catch(function (error) {
        // handle error
        addError(error.response.data, error.response.status);
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [params.todoId, addError]);

  const handleTodoDestroy = (todoId, callback) => {
    httpService.delete(`/todos/${todoId}.json`)
      .then((response) => {
        callback();
      })
      .catch(function (error) {
        addError(error.response.data, error.response.status);
        console.log(error);
      });
  };

  const handleTodoChange = (event, targetTodo) => {
    const todoData = {
      status: event.target.checked,
    };

    httpService.put(`/todos/${todo.id}.json`, todoData)
      .then((response) => {
        setTodo(response.data);
      })
      .catch(function (error) {
        addError(error.response.data, error.response.status);
        console.log(error);
      });
  };

  const handleSubtaskChange = (event, subtask) => {
    const todoData = {
      children_attributes: todo.children
        .filter((child) => (child.id === subtask.id))
        .map((child) => ({
          id: child.id,
          status: event.target.checked,
        }))
    };

    httpService.put(`/todos/${todo.id}.json`, todoData)
      .then((response) => {
        setTodo(response.data);
      })
      .catch(function (error) {
        addError(error.response.data, error.response.status);
        console.log(error);
      });
  };

  const loadChildren = (todo) => {
    if (!(todo.numberOfChildren > 0 && todo.children.length === 0)) {
      return;
    }

    httpService.get(`/todos/${todo.id}/children.json`)
      .then((response) => {
        const updatedTodo = {
          ...todo,
          children: response.data,
        }
        setTodo((todo) => ({
          ...todo,
          children: todoTraversal.changeAllOccurrencesOfTodoInTree(todo.children, updatedTodo)
        }));
      })
      .catch(function (error) {
        addError(error.response.data, error.response.status);
        console.log(error);
      });
  };

  return (
    <>
      <Container sx={{ mt: 2 }}>
        <TodoDetail todo={todo} handleTodoChange={handleTodoChange} handleSubtaskChange={handleSubtaskChange} handleTodoDestroy={handleTodoDestroy} loadChildren={loadChildren} />
      </Container>
    </>
  );
}
