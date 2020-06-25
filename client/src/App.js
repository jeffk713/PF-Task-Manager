import React, { Fragment, useEffect, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './components/Navbar/Navbar';
import Alert from './components/Alert/Alert';
import PageContainer from './components/Page-container/Page-container';
import Spinner from './components/Spinner/Spinner';
import ErrorBoundary from './components/Error-boundary/Error-boundary';

import { getUser } from './redux/actions/user-action';
import setupToken from './utilities/setup-token';

import './App.scss';

if (localStorage.token) setupToken(localStorage.token);

const Homepage = lazy(() => import('./components/Pages/Home-page'));
const TaskPage = lazy(() => import('./components/Pages/Tasks-page'));
const AddTaskPage = lazy(() => import('./components/Pages/Add-task-page'));
const EditTaskPage = lazy(() => import('./components/Pages/Edit-task-page'));
const TaskDetailPage = lazy(() => import('./components/Pages/Task-detail-page'));
const UserInfoPage = lazy(() => import('./components/Pages/User-info-page'));
const UsersPage = lazy(() => import('./components/Pages/Users-page'));
const EditUserPage = lazy(() => import('./components/Pages/Edit-user-page'));
const UploadProfilePage = lazy(() => import('./components/Pages/Upload-profile-page'));
const ChatPage = lazy(() => import('./components/Pages/Chat-page'));
const SignPage = lazy(() => import('./components/Pages/Sign-page'));

const App = ({ getUser }) => {
  useEffect(() => {
    getUser();
  }, []);
  return (
    <Fragment>
      <Navbar />
      <PageContainer>
        <Alert />
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <Route exact path='/' component={Homepage} />
              <Route exact path='/tasks' component={TaskPage} />
              <Route exact path='/task-add' component={AddTaskPage} />
              <Route exact path='/tasks/:task_id' component={TaskDetailPage} />
              <Route exact path='/task-edit/:task_id' component={EditTaskPage} />
              <Route exact path='/users' component={UsersPage} />
              <Route exact path='/userinfo' component={UserInfoPage} />
              <Route exact path='/userinfo-edit' component={EditUserPage} />
              <Route exact path='/profile-edit' component={UploadProfilePage} />
              <Route path='/chat' component={ChatPage} />
              <Route exact path='/sign' component={SignPage} />
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </PageContainer>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser()),
});

export default connect(null, mapDispatchToProps)(App);
