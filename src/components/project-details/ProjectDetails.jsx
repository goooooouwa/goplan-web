import TodoList from "components/todo-list/TodoList";
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
          <h2>Project: {this.state.goalName}</h2>
          <p>
            {this.state.targetDate}
          </p>
        <TodoList todos={this.state.todos} />
        </main>
      </>
    );
  }
}
