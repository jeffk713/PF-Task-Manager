import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import moment from 'moment';

import { updateTask } from '../../redux/actions/task-action';

import UtilButton from '../Util-components/Util-button';

import '../scss/Pages.style.scss';

const INITIAL_STATE = {
  date: moment.utc().format('YYYY-MM-DD'),
  title: '',
  detail: '',
  completed: false,
  _id: '',
};

const EditTaskPage = ({ match, isAuth, tasks, updateTask, history }) => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const { date, title, detail, completed, _id } = formData;

  useEffect(() => {
    const task = tasks.find((task) => task._id === match.params.task_id);
    setFormData({ ...task, date: moment.utc(task.date).format('YYYY-MM-DD') });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateTask({ date, title, detail, completed, _id });
    history.push('/tasks');
  };

  if (!isAuth) return <Redirect to='/' />;

  return (
    <Fragment>
      <h1>
        <i className='fas fa-calendar-plus'></i> EDIT A TASK
      </h1>
      <form className='form'>
        <div className='form-group'>
          <UtilButton purpose='back' pushUrl='/tasks' />
          <input
            className='form-input'
            name='date'
            type='date'
            value={date}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <input
            className='form-input'
            name='title'
            type='text'
            value={title}
            onChange={handleChange}
            placeholder='Title'
          />
        </div>
        <div className='form-group'>
          <textarea
            className='form-input'
            name='detail'
            type='text'
            value={detail}
            onChange={handleChange}
            placeholder='Detail'
            rows='4'
          />
        </div>
        <div className='form-group form-check'>
          <p>Check if already completed</p>
          <input
            className='form-input-checkbox'
            name='completed'
            type='checkbox'
            value={completed}
            onChange={() => setFormData({ ...formData, completed: !completed })}
            checked={completed ? true : false}
          />
        </div>
        <div className='form-group'>
          <div className='btn bg-main btn-lg' onClick={handleSubmit}>
            SAVE TASK
          </div>
        </div>
      </form>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.userReducer.isAuth,
  tasks: state.taskReducer.tasks,
});

const mapDispatchToProps = (dispatch) => ({
  updateTask: ({ date, title, detail, completed, _id }) =>
    dispatch(updateTask({ date, title, detail, completed, _id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditTaskPage));
