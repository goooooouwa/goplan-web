import ProjectList from "components/project-list/ProjectList";
import httpService from "httpService";
import React from "react";

export default class ProjectsListPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: []
    };

    this.handleRequestSuccess = this.handleRequestSuccess.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount");
    httpService.get('/projects.json')
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
      projects: response.data.map((project) => {
        return {
          goalName: project.goal_name,
          targetDate: project.target_date
        }
      })
    });
  }

  render() {
    return (
      <>
        <main>
          <h2>Projects</h2>
          <ProjectList projects={this.state.projects} />
        </main>
      </>
    );
  }
}
