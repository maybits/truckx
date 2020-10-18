'use strict';

/**
 * Module dependencies.
 */

var env = process.env.NODE_ENV;

var express = require('express');
var http = require('http');
var bunyan = require('bunyan');
var https = require('https');
var util = require('util');
var bodyParser = require('body-parser');
var path = require('path');
var _ = require('lodash');


var app = express();
var router = express.Router();
process.env.HOME = '/var/www';
app.set('port', process.env.PORT || 7342);
app.set('jsonp callback', true);
app.use(bodyParser.json({
  limit: '10mb'
}));

app.use(bodyParser.urlencoded({
  extended      : true,
  limit         : '10mb',
  parameterLimit: '5000'
}));

app.use(bodyParser.text({
  limit: '10mb'
}));

app.use(router);


require('./routes')(router);

app.use(function(req, res, next) {
  res.sendStatus(404);
});

http.createServer(app)
  .on('error', function(err) {
    util.log(err);
    process.exit(1);
  })
  .listen(app.get('port'), function(){
    util.log('TruckX listening on port ' + app.get('port') + ' in ' + app.get('env'));
  });
