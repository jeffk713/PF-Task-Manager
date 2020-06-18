import React, { Fragment, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './components/Navbar/Navbar';
import Alert from './components/Alert/Alert';
import PageContainer from './components/Page-container/Page-container';

import HomePage from './components/Pages/Home-page';
import TaskPage from './components/Pages/Tasks-page';
import AddTaskPage from './components/Pages/Add-task-page';
import EditTaskPage from './components/Pages/Edit-task-page';
import TaskDetailPage from './components/Pages/Task-detail-page';
import UserPage from './components/Pages/User-page';
import EditUserPage from './components/Pages/Edit-user-page';
import SignPage from './components/Pages/Sign-page';

import { getUser } from './redux/actions/user-action';
import setupToken from './utilities/setup-token';

import './App.scss';
if (localStorage.token) setupToken(localStorage.token);

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
          <Route exact path='/' component={HomePage} />
          <Route exact path='/tasks' component={TaskPage} />
          <Route exact path='/task-add' component={AddTaskPage} />
          <Route exact path='/tasks/:task_id' component={TaskDetailPage} />
          <Route exact path='/task-edit/:task_id' component={EditTaskPage} />
          <Route exact path='/userinfo' component={UserPage} />
          <Route exact path='/userinfo-edit' component={EditUserPage} />
          <Route exact path='/sign' component={SignPage} />
        </Switch>
      </PageContainer>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser()),
});

export default connect(null, mapDispatchToProps)(App);
