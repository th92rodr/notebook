const express = require('express');

const { logger } = require('../middleware/logger');
const checkAuthentication = require('../middleware/authentication');

const NoteController = require('../controllers/note');
const UserController = require('../controllers/user');

const router = express.Router();

// MIDDLEWARES
router.use(logger);
router.use(checkAuthentication);

// ROUTES
router.get('/', (req, res) => {
  res.send('Hello World');
});

// Note routes
router.get(
  '/note/index',
  NoteController.validate('index'),
  NoteController.index
);
router.get('/note/index/:noteId', NoteController.show);
router.post(
  '/note/add',
  NoteController.validate('store'),
  NoteController.store
);
router.delete('/note/delete/:noteId', NoteController.delete);
router.put(
  '/note/update/:noteId',
  NoteController.validate('update'),
  NoteController.update
);

// User routes
router.post(
  '/user/add',
  UserController.validate('store'),
  UserController.store
);
router.delete('/user/delete/:userId', UserController.delete);
router.put(
  '/user/update/:userId',
  UserController.validate('update'),
  UserController.update
);

router.post('/login', UserController.validate('login'), UserController.login);

module.exports = router;
