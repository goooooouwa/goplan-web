import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ProjectLayout from './views/projects/ProjectLayout';
import ProjectListContainer from './views/projects/ProjectListContainer';
import ProjectDetailContainer from './views/projects/ProjectDetailContainer';
import NewProjectForm from './views/projects/NewProjectForm';
import TodoLayout from './views/todos/TodoLayout';
import TodoListContainer from './views/todos/TodoListContainer';
import TodoDetailContainer from './views/todos/TodoDetailContainer';
import NewTodoForm from './views/todos/NewTodoForm';
import TimelineLayout from './views/timeline/TimelineLayout';
import TimelineYearContainer from './views/timeline/TimelineYearContainer/TimelineYearContainer';
import TimelineDayView from './views/timeline/TimelineDayView';
import TimelineWeekContainer from 'views/timeline/TimelineWeekContainer/TimelineWeekContainer';
import TimelineMonthContainer from 'views/timeline/TimelineMonthContainer';
import EditProjectForm from 'views/projects/EditProjectForm';
import EditTodoForm from 'views/todos/EditTodoForm';
import OAuthCallbackContainer from 'views/users/OAuthCallbackContainer';
import AccountDetailContainer from 'views/users/AccountDetailContainer';
import EditAccountForm from 'views/users/EditAccountForm';
import AccountLayout from 'views/users/AccountLayout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/callback" element={<OAuthCallbackContainer />} />
      <Route path="/" element={<App />}>
        <Route index element={<ProjectListContainer />} />
        <Route path="account" element={<AccountLayout />} >
          <Route index element={<AccountDetailContainer />} />
          <Route path="edit" element={<EditAccountForm />} />
        </Route>
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
