import { CssBaseline } from "@mui/material";
import ResponsiveAppBar from "components/ResponsiveAppBar";
import React from "react";
import { Outlet } from "react-router-dom";
import './App.css';
import './slider.css';
import './draggable.css';
import './grid-snap.css';

function App() {
  return (
    <>
      <CssBaseline />
      <div className="App">
        {/* <nav>
          <Link to="/">Home</Link> |{' '}
          <Link to="/projects">projects</Link> |{' '}
          <Link to="/projects/new">new project</Link> |{' '}
          <Link to="/projects/1">project #1</Link> |{' '}
          <Link to="/todos">todos</Link> |{' '}
          <Link to="/todos/new">new todo</Link> |{' '}
          <Link to="/todos/1">todo #1</Link> |{' '}
          <Link to="/timeline">timeline Year</Link> |{' '}
          <Link to="/timeline/month">timeline Month</Link> |{' '}
          <Link to="/timeline/week">timeline Week</Link> |{' '}
          <Link to="/timeline/day">timeline Day</Link> |{' '}
        </nav> */}
        <ResponsiveAppBar />
        <Outlet />
      </div>
    </>
  );
}

export default App;
