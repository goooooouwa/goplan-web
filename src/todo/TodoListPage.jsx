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
    this.setState({
      todos: response.data.map((todo) => {
        return {
          name: todo.name,
          description: todo.description,
          timeSpan: todo.time_span,
          startDate: todo.start_date,
          endDate: todo.end_date,
          repeat: todo.repeat,
          repeatPeriod: todo.repeat_period,
          repeatTimes: todo.repeat_times,
          instanceTimeSpan: todo.instance_time_span,
          dependencies: todo.dependencies,
          dependents: todo.dependents,
        }
      })
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
