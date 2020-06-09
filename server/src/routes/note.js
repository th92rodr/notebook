const express = require('express');

const controller = require('../controllers/note');
const cache = require('../middlewares/cache');

const router = express.Router();

router.get('/', controller.validate('index'), cache, controller.index);
router.get('/:noteId', controller.show);
router.post('/:userId', controller.validate('store'), controller.store);
router.delete('/:noteId', controller.delete);
router.put('/:noteId', controller.validate('update'), controller.update);

module.exports = router;
