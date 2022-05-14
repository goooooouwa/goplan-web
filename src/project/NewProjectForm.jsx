import React, { useState } from "react";

export default class NewProjectForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      goalName: "",
      targetDate: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.goalName + this.state.targetDate);
    event.preventDefault();
  }

  render() {
    return (
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
    );
  }
}