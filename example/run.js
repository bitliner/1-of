const MyEnv = require('my-env');
MyEnv({
  path: require('path').resolve(__dirname, './config')
});

const Runner = require('../').runner;
const streamify = require('stream-array');
const {Transform} = require('stream');



streamify([2, 4, 6]) // stream an array of integer
  .pipe(new Transform({
    objectMode: true,
    transform: function(chunk, encoding, done) {
      console.log('Pushing a number', chunk);
      this.push(chunk);
      done();
    }
  }))
  .pipe(new Runner().asStream('double'))
  .pipe(new Transform({
    objectMode: true,
    transform: function(chunk, encoding, done) {
      console.log('Result is', chunk)
      done();
    }
  }))
  .on('end', () => {
    console.log('End!!!')
  })