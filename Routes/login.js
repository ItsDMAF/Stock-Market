const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Models/User');
const LoginDto = require('../DTO/LoginDto')

require('dotenv').config();

router.post('/', async (req, res) => {
  let login = new LoginDto(req.body.email, req.body.password);

  const email = login.email;
  const password = login.password
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

    const payload = { id: user._id, email: user.email };

    const token = jwt.sign(payload, process.env.SecretKey, {
      expiresIn: process.env.Expiration || '1h',
    });
    // const decode = jwt.verify(token,process.env.SecretKey);
    res.status(200).json({
        token
    })

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
