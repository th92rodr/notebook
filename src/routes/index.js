const express = require('express');

const { logger } = require('../middleware/logger');
const checkAuthentication = require('../middleware/authentication');

const NoteController = require('../controllers/note');
const UserController = require('../controllers/user');

const router = express.Router();

// MIDDLEWARES
router.use(logger);
router.use(checkAuthentication);

router.use(handleCORS);

function handleCORS(req, res, next) {
  console.log('handle cors');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
    console.log('options');
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    return res.status(200).end();
  }
  next();
}

// ROUTES
router.get('/', (req, res) => {
  res.send('Hello World');
});

// Note Routes
router.get('/note/',
  NoteController.validate('index'),
  NoteController.index
);
router.get('/note/:noteId', NoteController.show);
router.post('/note/',
  NoteController.validate('store'),
  NoteController.store
);
router.delete('/note/:noteId', NoteController.delete);
router.put('/note/:noteId',
  NoteController.validate('update'),
  NoteController.update
);

// User Routes
router.post('/user/',
  UserController.validate('store'),
  UserController.store
);
router.delete('/user/:userId', UserController.delete);
router.put('/user/:userId',
  UserController.validate('update'),
  UserController.update
);

router.post('/login/',
  UserController.validate('login'),
  UserController.login
);

// Not Found Route
router.use('*', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

module.exports = router;
