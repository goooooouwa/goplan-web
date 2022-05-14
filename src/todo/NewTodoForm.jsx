import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import React from "react";

export default class NewTodoForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    console.log('A todo was submitted:');
    console.log(this.state.name);
    console.log(this.state.description);
    console.log(this.state.timeSpan);
    console.log(this.state.startDate);
    console.log(this.state.endDate);
    console.log(this.state.repeat);
    console.log(this.state.repeatPeriod);
    console.log(this.state.repeatTimes);
    console.log(this.state.instanceTimeSpan);
    console.log(this.state.dependencies);
    console.log(this.state.dependents);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Todo:
          <input
            type="text"
            name="name"
            value={this.state.name || ""}
            onChange={this.handleChange}
          />
        </label>
        <label>Description:
          <input
            type="text"
            name="description"
            value={this.state.description || ""}
            onChange={this.handleChange}
          />
        </label>
        <label>Time Allocation:
          <input
            type="time"
            name="timeSpan"
            value={this.state.timeSpan || ""}
            onChange={this.handleChange}
          />
        </label>
        <label>Start Date
          <input
            type="date"
            name="startDate"
            value={this.state.startDate || ""}
            onChange={this.handleChange}
          />
        </label>
        <label>End Date
          <input
            type="date"
            name="endDate"
            value={this.state.endDate || ""}
            onChange={this.handleChange}
          />
        </label>
        <FormControl>
          <FormLabel>Repeat?</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="false"
            name="radio-buttons-group"
            onChange={this.handleChange}
          >
            <FormControlLabel name="repeat" value="true" control={<Radio />} label="Yes" />
            <FormControlLabel name="repeat" value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        <label>
          Times
          <input
            type="number"
            name="repeatTimes"
            value={this.state.repeatTimes || ""}
            onChange={this.handleChange}
          />
        </label>
        <label>Per
          <select name="repeatPeriod" value={this.state.repeatPeriod} onChange={this.handleChange}>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="quarter">Quarter</option>
          </select>
        </label>
        <label>Duration of each instance
          <input
            type="time"
            name="instanceTimeSpan"
            value={this.state.instanceTimeSpan || ""}
            onChange={this.handleChange}
          />
        </label>
        <label>Dependencies
          <select multiple name="dependencies" value={this.state.dependencies} onChange={this.handleChange}>
            <option value="1">Todo #1</option>
            <option value="2">Todo #2</option>
            <option value="3">Todo #3</option>
          </select>
        </label>
        <label>Dependents
          <select multiple name="dependents" value={this.state.dependents} onChange={this.handleChange}>
            <option value="1">Todo #1</option>
            <option value="2">Todo #2</option>
            <option value="3">Todo #3</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}