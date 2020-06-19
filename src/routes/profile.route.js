const express = require('express');
const router = express.Router();
const multer = require('multer');
const { check, validationResult } = require('express-validator');

const auth = require('../middlewares/auth');
const Profile = require('../models/profile.model');
const User = require('../models/user.model');
const sharp = require('sharp');

// @route         POST /profile
// @description   Create or Update a profile
// @access        Private
router.post(
  '/',
  [auth, check('introduction', 'Introduction is required').not().isEmpty()],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json({ error: error.array() });

    try {
      const profile = await Profile.findOne({ owner: req.user.id });

      if (profile) {
        for (key in req.body) {
          profile[key] = req.body[key];
        }
        await profile.save();
        return res.json(profile);
      }

      if (!profile) {
        const newProfile = new Profile({ ...req.body, owner: req.user.id });
        await newProfile.save();
        return res.json(newProfile);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route         GET /profile/me
// @description   Get my prfile
// @access        Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ owner: req.user.id }).select('-avatar');
    if (!profile) returnres.status(404).json({ error: [{ msg: 'Profile not found' }] });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route         GET /profile
// @description   Get a user prfile
// @access        Private
router.get('/:user_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ owner: req.params.user_id }).select('-avatar');
    if (!profile) returnres.status(404).json({ error: [{ msg: 'Profile not found' }] });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route         DELETE /profile
// @description   Delete a user prfile
// @access        Private
router.delete('/', auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id }).select('-password');
    if (!user) return res.status(404).json({ error: [{ msg: 'User not found' }] });
    const profile = await Profile.findOne({ owner: req.user.id }).select('-avatar');
    if (!profile) return res.status(404).json({ error: [{ msg: 'Profile not found' }] });

    if (user._id.toString() === profile.owner.toString()) {
      await profile.remove();
      res.json(profile);
    } else {
      res.status(400).json({ error: [{ msg: 'Credential does not match' }] });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route         POST /profile/avatar
// @description   Upload a user prfile avatar
// @access        Private
const upload = multer({
  limits: {
    filesize: 1000000,
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error('File must be an image file'));
    }
    callback(undefined, true);
  },
});

router.post('/avatar', auth, upload.single('avatar'), async (req, res) => {
  try {
    const profile = await Profile.findOne({ owner: req.user.id }).select('-avatar');
    if (!profile) return res.status(404).json({ error: [{ msg: 'Profile not found' }] });

    const sharpBuffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    profile.avatar = sharpBuffer;
    await profile.save();
    res.send();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route         GET /profile/avatar/user_id
// @description   Get a user prfile avatar
// @access        Public
router.get('/avatar/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ owner: req.params.user_id }).select('-avatar');
    if (!profile) return res.json(undefined);

    res.set('Content-Type', 'image/png');
    res.send(profile.avatar);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route         DELETE /profile/avatar
// @description   Delete a user prfile avatar
// @access        Private
router.delete('/avatar', auth, async (req, res) => {
  const profile = await Profile.findOne({ owner: req.user.id }).select('-avatar');
  profile.avatar = undefined;
  await profile.save();
  res.send();
});

module.exports = router;
