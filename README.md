# 1-of

Build easily and run distributed task. 

Based on Redis and Kue.

## Usage

**Create a computing unit**

```
const Computing = require('../').computing;

module.exports = new Computing('double', (input, progress, done) => {
  progress(0, 0, input * 2);
  done();
});
```
NB: you can return more than 1 result by using progress.

**Create a runner**

```
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
```

**Start redis**

`docker run -p 6379:6379 redis`

**Run program**

1. `node example/computing.js`
2. `node example/run.js`


# TODO

[ ] - Logging
