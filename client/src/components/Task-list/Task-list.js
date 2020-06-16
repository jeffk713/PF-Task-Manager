import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';

import { deleteTask } from '../../redux/actions/task-action';

import '../scss/Task-list.style.scss';

const TaskList = ({ _id, date, title, completed, history, match, deleteTask }) => {
  return (
    <div className='task-list'>
      <div>
        <Moment format='MM-DD/YY'>{moment.utc(date)}</Moment>
      </div>
      <div className='to-detail' onClick={() => history.push(`${match.path}/${_id}`)}>
        {title}
      </div>
      <div>{completed ? 'completed' : 'incompleted'}</div>
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
