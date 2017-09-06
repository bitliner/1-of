const MyEnv = require('my-env');
MyEnv({
  path: require('path').resolve(__dirname, './config')
});
const Computing = require('../').computing;




module.exports = new Computing('double', (input, progress, done) => {
  progress(0, 0, input * 2);
  done();
});