const express = require('express');

const controller = require('../controllers/user');

const router = express.Router();

router.post('/', controller.validate('store'), controller.store);
router.delete('/:userId', controller.delete);
router.put('/:userId', controller.validate('update'), controller.update);
router.post('/login/', controller.validate('login'), controller.login);

module.exports = router;
