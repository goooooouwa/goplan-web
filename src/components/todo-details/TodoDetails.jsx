import httpService from "httpService";
import React from "react";

export default class TodoDetailsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projectId: "",
      name: "",
      description: "",
      timeSpan: "",
      startDate: "",
      endDate: "",
      repeat: false,
      repeatPeriod: "week",
      repeatTimes: 0,
      instanceTimeSpan: "",
      dependencies: [],
      dependents: []
    };

    this.handleRequestSuccess = this.handleRequestSuccess.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount");
    httpService.get(`/todos/${this.props.id}.json`)
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
    let todo = response.data;
    this.setState({
      projectId: todo.project_id,
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
    });
  }

  render() {
    return (
      <>
        <main>
          <h2>Todo: {this.state.name}</h2>
          <p>
            {this.state.projectId} |{' '}
            {this.state.description} |{' '}
            {this.state.timeSpan} |{' '}
            {this.state.startDate} |{' '}
            {this.state.endDate} |{' '}
            {this.state.repeat} |{' '}
            {this.state.repeatPeriod} |{' '}
            {this.state.repeatTimes} |{' '}
            {this.state.instanceTimeSpan} |{' '}
            {this.state.dependencies} |{' '}
            {this.state.dependents} |{' '}
          </p>
        </main>
      </>
    );
  }
}
