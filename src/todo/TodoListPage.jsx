import TodoList from "components/todo-list/TodoList";
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
          <h2>Todos</h2>
          <TodoList todos={this.state.todos} />
        </main>
      </>
    );
  }
}
