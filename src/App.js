import React from "react";
import { Route, Routes } from 'react-router-dom';
import moment from 'moment';
import ProjectLayout from './views/projects/ProjectLayout';
import ProjectListContainer from './views/projects/ProjectListContainer';
import ProjectDetailContainer from './views/projects/ProjectDetailContainer';
import NewProjectForm from './views/projects/NewProjectForm/NewProjectForm';
import TodoLayout from './views/todos/TodoLayout';
import TodoListContainer from './views/todos/TodoListContainer';
import TodoDetailContainer from './views/todos/TodoDetailContainer';
import NewTodoForm from './views/todos/NewTodoForm/NewTodoForm';
import TimelineLayout from './views/timeline/TimelineLayout';
import TimelineYearContainer from './views/timeline/TimelineYearContainer/TimelineYearContainer';
import TimelineDayView from './views/timeline/TimelineDayView';
import TimelineWeekContainer from 'views/timeline/TimelineWeekContainer/TimelineWeekContainer';
import TimelineMonthContainer from 'views/timeline/TimelineMonthContainer/TimelineMonthContainer';
import EditProjectForm from 'views/projects/EditProjectForm';
import EditTodoForm from 'views/todos/EditTodoForm';
import OAuthCallbackContainer from 'views/users/OAuthCallbackContainer';
import AccountDetailContainer from 'views/users/AccountDetailContainer';
import EditAccountForm from 'views/users/EditAccountForm';
import AccountLayout from 'views/users/AccountLayout';
import LandingPage from 'views/app/LandingPage';
import ProtectedRoute from 'components/ProtectedRoute';
import AppLayout from 'views/app/AppLayout';
import './App.css';
import { AuthProvider } from "hooks/useAuth";
import GoodByePage from "views/app/GoodByePage";
import APIErrorNotification from "components/APIErrorNotification";
import { APIErrorProvider } from "hooks/useAPIError";

moment.locale('en');

function App() {
  return (
    <AuthProvider>
      <APIErrorProvider>
        <APIErrorNotification />
      <Routes>
        <Route path="/callback" element={<OAuthCallbackContainer />} />
        <Route path="/welcome" element={<LandingPage />} />
        <Route path="/goodbye" element={<GoodByePage />} />
        <Route path="/" element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }>
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
      </APIErrorProvider>
    </AuthProvider>
  );
}

export default App;
