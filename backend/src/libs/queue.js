const Queue = require('bull');

const jobs = require('../jobs/');

const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, process.env.QUEUE_REDIS_URL),
  name: job.key,
  handle: job.handle,
  options: job.options
}));

module.exports = {
  queues,
  add(name, data) {
    const queue = queues.find(queue => queue.name === name);

    return queue.bull.add(data, queue.options);
  },
  process() {
    return queues.forEach(queue => {
      queue.bull.process(queue.handle);

      queue.bull.on('failed', (job, error) => {
        console.log('Job failed: ', job.name);
        console.log('Error: ', error);
      });
    });
  }
};
