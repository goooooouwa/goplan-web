import httpService from "httpService";
import React from "react";

export default class ProjectDetailsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      goalName: "",
      targetDate: ""
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
    let project = response.data;
    this.setState({
      goalName: project.goal_name,
      targetDate: project.target_date
    });
  }

  render() {
    return (
      <>
        <main>
          <h2>Project: {this.state.goalName}</h2>
          <p>
            {this.state.targetDate}
          </p>
        </main>
      </>
    );
  }
}
