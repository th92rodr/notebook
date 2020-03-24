const express = require('express');
const BullBoard = require('bull-board');

const Queue = require('../libs/queue');
BullBoard.setQueues(Queue.queues.map(queue => queue.bull));

const router = express.Router();

router.get('/', BullBoard.UI);

module.exports = router;
