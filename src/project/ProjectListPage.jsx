import { Typography } from "@mui/material";
import ProjectList from "components/ProjectList";
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
    this.setState({ projects: response.data });
  }

  render() {
    return (
      <>
        <main>
          <Typography variant="h3" component="div" gutterBottom>
            Projects
          </Typography>
          <ProjectList projects={this.state.projects} />
        </main>
      </>
    );
  }
}
