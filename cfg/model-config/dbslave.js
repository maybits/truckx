'use strict';

var env = require('./../env');
var config = {};

config.development = {
  host    : 'localhost',
  user    : 'user2',
  password: 'truckx',
  database: 'truckx',
  min     : 2,
  max     : 5
};

module.exports = config[env];
