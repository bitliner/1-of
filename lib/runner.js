
const {Transform} = require('stream');
const kue = require('kue');

const queue = kue.createQueue({
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_IP,
  },
});

class Runner {
  constructor() {}
  async exec() {
    return new Promise((resolve, reject) => {
      const job = queue
        .create(name, chunk)
        .removeOnComplete(true)
        .save((err) => {
          if (err) {
            return reject(err);
          }

          job
            .on('complete', (result) => {
              resolve();
            })
            .on('progress', (progress, data) => {
              // Logger.info('onProgress: Receiving reviews...');
              // this.push(data);
            })
            .on('failed', (err) => {
              reject(err);
            });
        });
    });

  }
  asStream(name) {
    return new Transform({
      objectMode: true,
      transform: function(chunk, encoding, done) {
        // Logger.debug('Sending to the worker a "browser job"');

        const job = queue
          .create(name, chunk)
          .removeOnComplete(true)
          .save((err) => {
            if (err) {
              return done(err);
            }

            job
              .on('complete', (result) => {
                done();
              })
              .on('progress', (progress, data) => {
                // Logger.info('onProgress: Receiving reviews...');
                // console.log('data', data)
                this.push(data.toString());
              })
              .on('failed', (err) => {
                done(err);
              });
          });
      },
    })
  }
}

module.exports = Runner;


