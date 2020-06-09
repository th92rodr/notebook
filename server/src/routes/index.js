const express = require('express');

const note = require('./note');
const user = require('./user');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    notes: 'http://localhost:8080/notes',
    users: 'http://localhost:8080/users'
  });
});

router.use('/notes', note);
router.use('/users', user);

// Not Found Route
router.use('*', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

module.exports = router;
