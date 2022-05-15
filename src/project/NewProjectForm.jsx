import httpService from "httpService";
import React from "react";
import { Navigate } from "react-router-dom";

export default class NewProjectForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      goalName: "",
      targetDate: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitSuccess = this.handleSubmitSuccess.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('A project was submitted:');
    console.log(this.state);

    const projectData = {
      goal_name: this.state.goalName,
      target_date: this.state.targetDate
    };

    httpService.post('/projects.json', projectData)
      .then(this.handleSubmitSuccess)
      .catch(function (error) {
        console.log(error);
      });
  }

  handleSubmitSuccess(response) {
    console.log(response);
    this.setState({ id: response.data.id });
  }


  render() {
    return (
      <div>
        {this.state.id && (
          <Navigate to={`/projects/${this.state.id}`} />
        )}
        <form onSubmit={this.handleSubmit}>
          <label>
            What's your goal?
            <input
              type="text"
              name="goalName"
              value={this.state.goalName || ""}
              onChange={this.handleChange}
            />
          </label>
          <label>Target Date:
            <input
              type="date"
              name="targetDate"
              value={this.state.targetDate || ""}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}