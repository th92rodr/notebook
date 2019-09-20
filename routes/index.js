const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World');
});

// Note routes
router.get('/note/index', () => {});
router.get('/note/index/:noteId', () => {});
router.post('/note/add', () => {});
router.delete('/note/delete/:noteId', () => {});
router.put('/note/update/:noteId', () => {});

// User routes
router.post('/user/add', () => {});
router.delete('/user/delete/:userId', () => {});
router.put('/user/update/:userId', () => {});

module.exports = router;