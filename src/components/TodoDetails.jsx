import React from "react";

export default function TodoDetails(props) {
  return (
    <>
      <h2>Todo: {props.todo.name}</h2>
      <p>
        {props.todo.projectId} |{' '}
        {props.todo.description} |{' '}
        {props.todo.timeSpan} |{' '}
        {props.todo.startDate} |{' '}
        {props.todo.endDate} |{' '}
        {props.todo.repeat} |{' '}
        {props.todo.repeatPeriod} |{' '}
        {props.todo.repeatTimes} |{' '}
        {props.todo.instanceTimeSpan} |{' '}
        {props.todo.dependencies} |{' '}
        {props.todo.dependents} |{' '}
      </p>
    </>
  );
}
