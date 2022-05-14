import TodoList from "components/todo-list/TodoList";
import httpService from "httpService";
import React from "react";

export default class TodosListPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: []
    };

    httpService.get('/todos.json')
      .then(function (response) {
        // handle success
        console.log(response);
        this.setState({
          todos: response.data
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
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
