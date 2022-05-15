import React from "react";

export default function TodoItem(props) {
    return <li>
        {props.projectId} |{' '}
        {props.name} |{' '}
        {props.description} |{' '}
        {props.timeSpan} |{' '}
        {props.startDate} |{' '}
        {props.endDate} |{' '}
        {props.repeat} |{' '}
        {props.repeatPeriod} |{' '}
        {props.repeatTimes} |{' '}
        {props.instanceTimeSpan} |{' '}
        {props.dependencies} |{' '}
        {props.dependents} |{' '}
    </li>;
}
