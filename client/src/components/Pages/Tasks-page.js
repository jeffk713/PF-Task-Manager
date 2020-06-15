import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import TaskListTable from '../Task-list/Task-list-table';
import UtilPage from './Util-page';

import { getTasks } from '../../redux/actions/task-action';

import '../scss/Pages.style.scss';

const INITIAL_STATE = {
  sortBy: 'all',
};

const TasksPage = ({ userState: { isAuth, token }, getTasks, tasks }) => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const { sortBy } = formData;

  useEffect(() => {
    getTasks(token);
  }, []);

  // useEffect(() => {
  //   getTasks(token, sortBy);
  // }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ [name]: value });
  };

  return (
    <Fragment>
      <div className='tasks-header'>
        <div className='tasks-header-title'>
          <h1>
            <i className='fas fa-check'></i> TASKS
          </h1>
        </div>
        {isAuth && tasks.length > 0 && (
          <div className='tasks-header-sort'>
            <p>Sorted by</p>
            <select name='sortBy' value={sortBy} onChange={handleChange}>
              <option value='all'>All</option>
              <option value='false'>Incompleted</option>
              <option value='true'>Completed</option>
            </select>
          </div>
        )}
      </div>
      {!isAuth ? <UtilPage purpose='guest' /> : <TaskListTable sortBy={sortBy} />}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  userState: state.userReducer,
  tasks: state.taskReducer.tasks,
});

const mapDispatchToProps = (dispatch) => ({
  getTasks: (token, sortBy) => dispatch(getTasks(token, sortBy)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);
