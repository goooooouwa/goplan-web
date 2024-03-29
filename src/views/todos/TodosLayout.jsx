import React, { useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import { useLoading } from "hooks/useLoading";
import { useAPIError } from "hooks/useAPIError";
import httpService from "services/httpService";
import todoTraversal from "utils/todoTraversal";
import { cloneDeep, debounce } from "lodash";

export default function TodosLayout() {
  const [todos, setTodos] = useState([]);
  const { addError } = useAPIError();
  const { startLoading, finishLoading } = useLoading();

  const updateTodoStartEndDate = (todo, todoData, callback) => {
    startLoading();
    httpService.put(`/todos/${todo.id}.json`, todoData)
      .then((response) => {
        // This setTodos() can be elimated if reloadTodos() afterwards
        setTodos((todos) => {
          return todoTraversal.changeAllOccurrencesOfTodoInTree(todos, response.data, true);
        });
      })
      .catch(function (error) {
        let updatedTodo = cloneDeep(todo);
        // This is to mark the todo as dirty, so that later reloadTodos() can trigger a render
        updatedTodo.startDate = todoData.start_date || todo.startDate;   // set new start date if new date provided, otherwise keep it as previous
        updatedTodo.endDate = todoData.end_date || todo.endDate;
        setTodos((todos) => {
          return todoTraversal.changeAllOccurrencesOfTodoInTree(todos, updatedTodo, true);
        });
        addError(error.response.data, error.response.status);
        console.log(error);
      })
      .then(() => {
        callback();
        finishLoading();
      });
  };

  const updateTodoStatus = (event, todo, callback) => {
    const todoData = {
      status: event.target.checked,
    };

    httpService.put(`/todos/${todo.id}.json`, todoData)
      .then((response) => {
        // This setTodos() can be elimated if reloadTodos() afterwards
        setTodos((todos) => {
          return todoTraversal.changeAllOccurrencesOfTodoInTree(todos, response.data, true);
        });
      })
      .catch(function (error) {
        addError(error.response.data, error.response.status);
        console.log(error);
      })
      .then(() => {
        callback();
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
        setTodos((todos) => {
          return todoTraversal.changeAllOccurrencesOfTodoInTree(todos, updatedTodo);
        });
      })
      .catch(function (error) {
        addError(error.response.data, error.response.status);
        console.log(error);
      });
  };

  const reloadTodos = (todosUrl) => {
    startLoading();
    httpService.get(todosUrl)
      .then((response) => {
        setTodos(response.data);
      })
      .catch(function (error) {
        // handle error
        addError(error.response.data, error.response.status);
        console.log(error);
      })
      .then(function () {
        finishLoading();
      });
  };

  const debouncedReloadTodos = useCallback(
    debounce(reloadTodos, 300),
    []
  );

  return (
    <Outlet context={[todos, updateTodoStartEndDate, updateTodoStatus, loadChildren, debouncedReloadTodos]} />
  );
}
