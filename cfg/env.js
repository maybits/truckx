'use strict';

var defaultEnv = 'development';

var envToBeExported = (process.env.NODE_ENV|| defaultEnv).toLowerCase();
module.exports = envToBeExported;

if (envToBeExported === 'local') {
  module.exports = defaultEnv;
}
