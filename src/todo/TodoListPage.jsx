import { Typography } from "@mui/material";
import TodoList from "components/TodoList";
import httpService from "httpService";
import React from "react";

export default class TodosListPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: []
    };

    this.handleRequestSuccess = this.handleRequestSuccess.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount");
    httpService.get('/todos.json')
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
    this.setState({ todos: response.data });
  }

  render() {
    return (
      <>
        <main>
          <Typography variant="h3" component="div" gutterBottom>
            Todos
          </Typography>
          <TodoList todos={this.state.todos} />
        </main>
      </>
    );
  }
}
