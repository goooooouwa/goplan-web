import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ProjectLayout from './project/ProjectLayout';
import ProjectListContainer from './project/ProjectListContainer';
import ProjectDetailContainer from './project/ProjectDetailContainer';
import NewProjectForm from './project/NewProjectForm';
import TodoLayout from './todo/TodoLayout';
import TodoListContainer from './todo/TodoListContainer';
import TodoDetailContainer from './todo/TodoDetailContainer';
import NewTodoForm from './todo/NewTodoForm';
import TimelineLayout from './timeline/TimelineLayout';
import TimelineYearContainer from './timeline/TimelineYearContainer';
import TimelineDayView from './timeline/TimelineDayView';
import TimelineWeekContainer from 'timeline/TimelineWeekContainer';
import TimelineMonthContainer from 'timeline/TimelineMonthContainer';
import EditProjectForm from 'project/EditProjectForm';
import EditTodoForm from 'todo/EditTodoForm';
import OAuthCallbackContainer from 'components/OAuthCallbackContainer';
import AccountDetailContainer from 'user/AccountDetailContainer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/callback" element={<OAuthCallbackContainer />} />
      <Route path="/" element={<App />}>
        <Route index element={<ProjectListContainer />} />
        <Route path="account" element={<AccountDetailContainer />} />
        <Route path="projects" element={<ProjectLayout />} >
          <Route index element={<ProjectListContainer />} />
          <Route path=":projectId/edit" element={<EditProjectForm />} />
          <Route path=":projectId" element={<ProjectDetailContainer />} >
            <Route path="year" element={<TimelineYearContainer />} />
            <Route path="month" element={<TimelineMonthContainer />} />
            <Route path="week" element={<TimelineWeekContainer />} />
            <Route path="todos" element={<TodoLayout />} >
              <Route index element={<TodoListContainer />} />
              <Route path=":todoId" element={<TodoDetailContainer />} />
              <Route path="new" element={<NewTodoForm />} />
              <Route path=":todoId/edit" element={<EditTodoForm />} />
            </Route>
          </Route>
          <Route path="new" element={<NewProjectForm />} />
        </Route>
        <Route path="todos" element={<TodoLayout />} >
          <Route index element={<TodoListContainer />} />
          <Route path=":todoId" element={<TodoDetailContainer />} />
          <Route path="new" element={<NewTodoForm />} />
          <Route path=":todoId/edit" element={<EditTodoForm />} />
        </Route>
        <Route path="timeline" element={<TimelineLayout />} >
          <Route index element={<TimelineYearContainer />} />
          <Route path="month" element={<TimelineMonthContainer />} />
          <Route path="week" element={<TimelineWeekContainer />} />
          <Route path="day" element={<TimelineDayView />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
