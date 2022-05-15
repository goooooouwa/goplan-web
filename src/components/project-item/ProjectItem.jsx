import React from "react";

export default function ProjectItem(props) {
    return <li>
        {props.goalName} |{' '}
        {props.targetDate} |{' '}
    </li>;
}
