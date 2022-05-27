import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ProjectLayout from './project/ProjectLayout';
import ProjectListContainer from './project/ProjectListContainer';
import ProjectDetailsContainer from './project/ProjectDetailContainer';
import NewProjectForm from './project/NewProjectForm';
import TodoLayout from './todo/TodoLayout';
import TodoListContainer from './todo/TodoListContainer';
import TodoDetailsContainer from './todo/TodoDetailContainer';
import NewTodoForm from './todo/NewTodoForm';
import TimelineLayout from './timeline/TimelineLayout';
import TimelineYearContainer from './timeline/TimelineYearContainer';
import TimelineMonthView from './timeline/TimelineMonthView';
import TimelineDayView from './timeline/TimelineDayView';
import TimelineWeekContainer from 'timeline/TimelineWeekContainer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<ProjectListContainer />} />
          <Route path="projects" element={<ProjectLayout />} >
            <Route index element={<ProjectListContainer />} />
            <Route path=":projectId" element={<ProjectDetailsContainer />} >
              <Route path="timeline" element={<TimelineYearContainer />} />
              <Route path="todos" element={<TodoListContainer />} >
                <Route path=":todoId" element={<TodoDetailsContainer />} />
                <Route path="new" element={<NewTodoForm />} />
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
            <Route path="week" element={<TimelineWeekContainer />} />
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
