const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../middlewares/auth');
const Task = require('../models/task.model');
const User = require('../models/user.model');

// @route         POST /task
// @description   Create a task
// @access        Private
router.post('/', [auth, check('title', 'Title is required').not().isEmpty()], async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) return res.status(400).json({ error: error.array() });

  try {
    const task = new Task({ ...req.body, owner: req.user.id });
    await task.save();
    res.json(task);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route         GET /task
// @description   Get all task by user
// @access        Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user.id });
    if (!user) return res.status(400).json({ error: [{ msg: 'User not found' }] });
    const tasks = await Task.find(
      req.query.completed === undefined
        ? { owner: req.user.id }
        : { owner: req.user.id, completed: `${req.query.completed}` }
    ).sort({ date: -1 });

    res.json(tasks);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route         GET /task/:task_id
// @description   Get a task by task ID
// @access        Private
router.get('/:task_id', auth, async (req, res) => {
  try {
    const task = await Task.findById({ _id: req.params.task_id });
    if (!task) return res.status(400).json({ error: [{ msg: 'Task not found' }] });
    const isMatch = req.user.id === task.owner.toString();
    if (!isMatch) return res.status(400).json({ error: [{ msg: 'User not authorized' }] });

    res.json(task);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route         UPDATE /task/:task_id
// @description   Update a task by task ID
// @access        Private
router.patch('/:task_id', auth, async (req, res) => {
  try {
    const task = await Task.findById({ _id: req.params.task_id });
    if (!task) return res.status(400).json({ error: [{ msg: 'Task not found' }] });
    const isMatch = req.user.id === task.owner.toString();
    if (!isMatch) return res.status(400).json({ error: [{ msg: 'User not authorized' }] });

    for (const key in task) {
      if (key in req.body) task[key] = req.body[key];
    }
    await task.save();

    res.json(task);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route         DELETE /task/:task_id
// @description   Delete a task by task ID
// @access        Private
router.delete('/:task_id', auth, async (req, res) => {
  try {
    const task = await Task.findById({ _id: req.params.task_id });
    if (!task) return res.status(400).json({ error: [{ msg: 'Task not found' }] });
    const isMatch = req.user.id === task.owner.toString();
    if (!isMatch) return res.status(400).json({ error: [{ msg: 'User not authorized' }] });

    await task.remove();

    res.json({ task, msg: 'Task deleted' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route         DELETE /task
// @description   Delete all tasks
// @access        Private
router.delete('/', auth, async (req, res) => {
  try {
    await Task.deleteMany({ owner: req.user.id });

    res.json({ msg: 'All tasks deleted' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
