import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ProjectLayout from './project/ProjectLayout';
import ProjectListContainer from './project/ProjectListPage';
import ProjectDetailsContainer from './project/ProjectDetailsContainer';
import NewProjectForm from './project/NewProjectForm';
import TodoLayout from './todo/TodoLayout';
import TodoListContainer from './todo/TodoListContainer';
import TodoDetailsContainer from './todo/TodoDetailsContainer';
import NewTodoForm from './todo/NewTodoForm';
import TimelineLayout from './timeline/TimelineLayout';
import TimelineYearContainer from './timeline/TimelineYearContainer';
import TimelineMonthView from './timeline/TimelineMonthView';
import TimelineWeekView from './timeline/TimelineWeekView';
import TimelineDayView from './timeline/TimelineDayView';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/goplan-web" element={<App />}>
          <Route path="projects" element={<ProjectLayout />} >
            <Route index element={<ProjectListContainer />} />
            <Route path=":projectId" element={<ProjectDetailsContainer />} >
              <Route path="todos" element={<TodoListContainer />} >
                <Route index element={<TimelineYearContainer />} />
                <Route path=":todoId" element={<TodoDetailsContainer />} />
              </Route>
            </Route>
            <Route path="new" element={<NewProjectForm />} />
          </Route>
          <Route path="todos" element={<TodoLayout />} >
            <Route index element={<TodoListContainer />} />
            <Route path=":todoId" element={<TodoDetailsContainer />} />
            <Route path="new" element={<NewTodoForm />} />
          </Route>
          <Route path="timeline" element={<TimelineLayout />} >
            <Route index element={<TimelineYearContainer />} />
            <Route path="month" element={<TimelineMonthView />} />
            <Route path="week" element={<TimelineWeekView />} />
            <Route path="day" element={<TimelineDayView />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
