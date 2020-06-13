const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/user.model');
const auth = require('../middlewares/auth');

// @route         POST /user
// @description   Create a user
// @access        Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password requires 6 or more characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json({ error: error.array() });

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ error: [{ msg: 'User already exists' }] });

      user = new User({ ...req.body });
      user.password = await bcrypt.hash(password, 10);
      await user.save();

      const payload = { user: { id: user._id } };
      jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route         POST /user/signin
// @description   Sgin in a user
// @access        Public
router.post(
  '/signin',
  [check('email', 'Please enter a valid email').isEmail(), check('password', 'Please enter a password').exists()],
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: [{ msg: 'Invalid credentials' }] });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: [{ msg: 'Invalid credentials' }] });

      const payload = { user: { id: user.id } };
      jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route         GET /user
// @description   Get a user
// @access        Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user.id });
    if (!user) return res.status(400).json({ error: [{ msg: 'User not found' }] });

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route         PATCH /user
// @description   Update a user
// @access        Private
router.patch('/', auth, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user.id });
    if (!user) return res.status(400).json({ error: [{ msg: 'User not found' }] });

    for (const key in user) {
      if (key in req.body) user[key] = req.body[key];
    }
    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route         DELETE /user
// @description   Delete a user
// @access        Private
router.delete('/', auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (!user) return res.status(400).json({ error: [{ msg: 'User not found' }] });

    await user.remove();
    res.json({ user, msg: 'User has been deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
