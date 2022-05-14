import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ProjectLayout from './project/ProjectLayout';
import ProjectsList from './project/ProjectsList';
import ProjectDetails from './project/ProjectDetails';
import NewProjectForm from './project/NewProjectForm';
import TodoLayout from './todo/TodoLayout';
import TodosList from './todo/TodosList';
import TodoDetails from './todo/TodoDetails';
import NewTodoForm from './todo/NewTodoForm';
import TimelineLayout from './timeline/TimelineLayout';
import TimelineYearView from './timeline/TimelineYearView';
import TimelineMonthView from './timeline/TimelineMonthView';
import TimelineWeekView from './timeline/TimelineWeekView';
import TimelineDayView from './timeline/TimelineDayView';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="projects" element={<ProjectLayout />} >
            <Route index element={<ProjectsList />} />
            <Route path=":projectId" element={<ProjectDetails />} />
            <Route path="new" element={<NewProjectForm />} />
          </Route>
          <Route path="todos" element={<TodoLayout />} >
            <Route index element={<TodosList />} />
            <Route path=":todoId" element={<TodoDetails />} />
            <Route path="new" element={<NewTodoForm />} />
          </Route>
          <Route path="timeline" element={<TimelineLayout />} >
            <Route index element={<TimelineYearView />} />
            <Route path="month" element={<TimelineMonthView />} />
            <Route path="week" element={<TimelineWeekView />} />
            <Route path="day" element={<TimelineDayView />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
