const express = require('express');

const controller = require('../controllers/note');

const router = express.Router();

router.get('/', controller.validate('index'), controller.index);
router.get('/:noteId', controller.show);
router.post('/', controller.validate('store'), controller.store);
router.delete('/:noteId', controller.delete);
router.put('/:noteId', controller.validate('update'), controller.update);

module.exports = router;
