import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';

import UtilButton from '../Util-components/Util-button';
import { deleteTask } from '../../redux/actions/task-action';

const INITIAl_STATE = {
  date: 'data error',
  title: 'data error',
  detail: 'data error',
  completed: false,
  _id: '',
};

const TaskDetailPage = ({ history, match, tasks, isAuth, deleteTask }) => {
  const [taskData, setTaskData] = useState(INITIAl_STATE);
  const { date, title, detail, completed, _id } = taskData;
  useEffect(() => {
    const task = tasks.find((task) => task._id === match.params.task_id);
    setTaskData({ ...task });
  }, []);

  if (!isAuth) return <Redirect to='/' />;

  return (
    <Fragment>
      <div className='detail-header'>
        <h1>
          <i className='fas fa-tasks'></i> TASK DETAIL
        </h1>
      </div>
      <div className='detail-body'>
        <div className='detail-body-table'>
          <div className='detail-body-table-group detail-btn-group'>
            <div>
              <UtilButton purpose='back' pushUrl='/tasks' />
            </div>
            <div>
              <UtilButton purpose='edit' handleClick={() => history.push(`/task-edit/${_id}`)} />
              <UtilButton
                purpose='delete'
                handleClick={() => {
                  deleteTask(_id);
                  history.push('/tasks');
                }}
              />
            </div>
          </div>
          <div className='detail-body-table-group'>
            <strong>Date: </strong> <Moment format='MM/DD/YYYY'>{moment.utc(date)}</Moment>
          </div>
          <div className='detail-body-table-group'>
            <strong>Title: </strong> {title}
          </div>
          <div className='detail-body-table-group'>
            <strong>Detail: </strong> {detail}
          </div>
          <div className='detail-body-table-group'>
            <strong>completed: </strong> {completed ? 'Completed' : 'Incompleted'}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.taskReducer.tasks,
  isAuth: state.userReducer.isAuth,
});

const mapDispatchToProps = (dispatch) => ({
  deleteTask: (_id) => dispatch(deleteTask(_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TaskDetailPage));
