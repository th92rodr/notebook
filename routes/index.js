const express = require('express');

const checkAuthentication = require('../middleware/authentication');
const NoteController = require('../controllers/note');
const UserController = require('../controllers/user');

const router = express.Router();

router.use(checkAuthentication);

router.get('/', (req, res) => {
  res.send('Hello World');
});

// Note routes
router.get('/note/index', NoteController.index);
router.get('/note/index/:noteId', NoteController.show);
router.post('/note/add', NoteController.store);
router.delete('/note/delete/:noteId', NoteController.delete);
router.put('/note/update/:noteId', NoteController.update);

// User routes
router.post('/user/add', UserController.store);
router.delete('/user/delete/:userId', UserController.delete);
router.put('/user/update/:userId', UserController.update);

router.get('/login', UserController.login);

module.exports = router;
