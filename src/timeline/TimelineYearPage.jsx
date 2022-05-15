import React from "react";
import TodoList from "components/TodoList";
import httpService from "httpService";
import { Typography } from "@mui/material";
import TimelineYearView from "components/TimelineYearView";
import MasterDetailsLayout from "components/MasterDetailsLayout";

export default class TimelineYearPage extends React.Component {
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
            Timeline (Year)
          </Typography>
          <MasterDetailsLayout
            master={
              <TodoList todos={this.state.todos} />
            }
            details={
              <TimelineYearView todos={this.state.todos} />
            } />
        </main>
      </>
    );
  }
}
