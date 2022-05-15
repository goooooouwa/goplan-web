import { Typography } from "@mui/material";
import TodoList from "components/TodoList";
import httpService from "httpService";
import React from "react";

export default class ProjectDetailsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      goalName: "",
      targetDate: "",
      todos: []
    };

    this.handleRequestSuccess = this.handleRequestSuccess.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount");
    httpService.get(`/projects/${this.props.id}.json`)
      .then(this.handleRequestSuccess)
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  handleRequestSuccess(response) {
    console.log(response);
    this.setState(response.data);
  }

  render() {
    return (
      <>
        <main>
          <Typography variant="h4" component="div" gutterBottom>
            Goal: {this.state.goalName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {this.state.targetDate}
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            Todos
          </Typography>
          <TodoList todos={this.state.todos} />
        </main>
      </>
    );
  }
}
