import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';

import { deleteTask } from '../../redux/actions/task-action';

import '../scss/Task-list.style.scss';

const TaskList = ({ _id, date, title, completed, history, match, deleteTask }) => {
  return (
    <div className='task-list'>
      <div className='hide-sm'>
        <Moment format='MM-DD/YY'>{moment.utc(date)}</Moment>
      </div>
      <div className='to-detail' onClick={() => history.push(`${match.path}/${_id}`)}>
        {title}
      </div>
      <div>
        {completed ? (
          <Fragment>
            <i class='fas fa-check hide-lg'></i>
            <p className='hide-sm'>Completed</p>
          </Fragment>
        ) : (
          <Fragment>
            <i className='fas fa-times hide-lg'></i>
            <p className='hide-sm'>Incompleted</p>
          </Fragment>
        )}
      </div>
      <div>
        <div>
          <i className='fas fa-backspace to-delete' onClick={() => deleteTask(_id)}></i>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteTask: ({ token, _id }) => dispatch(deleteTask({ token, _id })),
});

export default connect(null, mapDispatchToProps)(withRouter(TaskList));
