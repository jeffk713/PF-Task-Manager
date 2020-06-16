import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import { createTask } from '../../redux/actions/task-action';

import UtilButton from '../Util-components/Util-button';

import '../scss/Pages.style.scss';

const INITIAL_STATE = {
  date: moment().format('YYYY-MM-DD'),
  title: '',
  detail: '',
  completed: false,
};

const AddTaskPage = ({ createTask, isAuth, history }) => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const { date, title, detail, completed } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createTask({ date, title, detail, completed });
    setFormData({ ...INITIAL_STATE });
    history.push('/tasks');
  };

  if (!isAuth) return <Redirect to='/' />;

  return (
    <div className='add-task'>
      <div className='add-task-header'>
        <h1>
          <i className='fas fa-calendar-plus'></i> ADD A TASK
        </h1>
      </div>
      <div className='add-task-body'>
        <form className='add-task-form'>
          <div className='form-group'></div>
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
            />
          </div>
          <div className='form-group'>
            <div className='btn bg-main btn-lg' onClick={handleSubmit}>
              ADD TASK
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.userReducer.isAuth,
});

const mapDispatchToProps = (dispatch) => ({
  createTask: ({ date, title, detail, completed }) =>
    dispatch(createTask({ date, title, detail, completed })),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddTaskPage));
