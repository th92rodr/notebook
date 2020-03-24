const express = require('express');

const note = require('./note');
const user = require('./user');
const admin = require('./admin');

const router = express.Router();

router.use('/notes', note);
router.use('/users', user);
router.use('/admin', admin);

// Not Found Route
router.use('*', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

module.exports = router;
