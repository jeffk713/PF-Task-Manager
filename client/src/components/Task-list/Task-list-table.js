import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import TaskList from './Task-list';
import UtilPage from '../Util-components/Util-page';
import UtilButton from '../Util-components/Util-button';

import '../scss/Task-list.style.scss';

const TaskListTable = ({ tasks, sortBy }) => {
  const sortByBoolean = sortBy === 'true';
  const filteredTasks =
    sortBy !== 'all' ? tasks.filter((task) => task.completed === sortByBoolean) : tasks;

  const withTasks = (
    <div className='task-table'>
      <UtilButton purpose='add' pushUrl='/task-add' />
      <div className='task-table-head'>
        <div className='hide-sm'>Date</div>
        <div>Task</div>
        <div>Status</div>
        <div></div>
      </div>
      {filteredTasks.map(({ _id, ...others }) => (
        <TaskList key={_id} _id={_id} {...others} />
      ))}
    </div>
  );
  const withoutTasks = <UtilPage purpose='emptyData' />;

  return <Fragment>{tasks.length > 0 ? withTasks : withoutTasks}</Fragment>;
};

const mapStateToProps = (state) => ({
  tasks: state.taskReducer.tasks,
});

export default connect(mapStateToProps)(withRouter(TaskListTable));
