const kue = require('kue');

module.exports = function(name, compute) {
  const queue = kue.createQueue({
    redis: {
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_IP,
    },
  });
  // console.log('name', name);
  queue.process(name, (job, done) => {
    let input = job.data;

    // Logger.info('Received a job...', job.data);

    compute(
      input,
      job.progress.bind(job),
      done,
    );

  });
}