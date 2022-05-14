import React from "react";

export default function TodoItem(props) {
    return <li>
        {props.todo.name} |{' '}
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
    </li>;
}
