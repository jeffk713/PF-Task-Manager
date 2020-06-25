import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import TaskListTable from '../Task-list/Task-list-table';
import UtilPage from '../Util-components/Util-page';
import Spinner from '../Spinner/Spinner';

import { getTasksStart } from '../../redux/actions/task-action';

import '../scss/Pages.style.scss';

const INITIAL_STATE = {
  sortBy: 'all',
};

const TasksPage = ({ userState: { isAuth }, taskState: { tasks, taskLoading }, getTasksStart }) => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const { sortBy } = formData;

  useEffect(() => {
    getTasksStart();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ [name]: value });
  };

  return (
    <Fragment>
      <div className='tasks-header'>
        <h1>
          <i className='fas fa-check'></i> TASKS
        </h1>
        {isAuth && !taskLoading && tasks.length > 0 && (
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
      {isAuth && !taskLoading ? (
        <TaskListTable sortBy={sortBy} />
      ) : taskLoading ? (
        <Spinner />
      ) : (
        <UtilPage purpose='guest' />
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  userState: state.userReducer,
  taskState: state.taskReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getTasksStart: () => dispatch(getTasksStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);
