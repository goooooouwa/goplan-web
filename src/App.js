import React from "react";
import { Outlet, Link } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <nav>
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
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
