const express = require('express');
const router = express.Router();
const config = require('config');
const auth = require('../../middleware/auth');
const bycrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');
const User = require('../../models/User');

//  @route  GET api/auth
//  @desc   Get user by token
//  @access Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -__v -date');
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//  @route  POST api/auth
//  @desc   Authenticate user & get token
//  @access Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bycrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      // Return jsonwebtoken
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 }, // TODO - Change this to 3600
        (err, token) => {
          if (err) throw err;
          const { name, email, _id , avatar } = user;
          res.json({ token, user: { _id, name, email, avatar }});
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
