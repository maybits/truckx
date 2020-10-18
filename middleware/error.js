'use strict';

var util = require('util');
var _ = require('lodash');
var bunyan = require('bunyan');

var logger = bunyan.createLogger({name: 'truckx.route.error'});
// Common error mw
// Error Title Map
var errorMap = {
  500: 'Unknown Error',
  401: 'Login required',
  402: 'Provider Error',
  403: 'Forbidden',
  404: 'Not Found',
  406: 'Validation Error'
};

var env = process.env.NODE_ENV || 'development';

module.exports = function errHandler(err, req, res, next) {
  var code = err.status;
  req.log = (req.log || logger);
  if (!code) {
    // set 400 if its an internal url
    code = /v1\/internal/.test(req.path) ? 400 : 500;
  }

  var title = err.title || errorMap[code];
  var action = err.action || '';
  var button_text = err.button_text || '';

  var response = {
    error : err.message,
    code  : code,
    status: {
      result : 'failure',
      message: {
        action : action,
        title  : title,
        message: err.message
      }
    },
    requestid: _.get(req, 'session.session_id', '') || req.requestid
  };

  // started sending rejected-trips in META
  if (!_.isEmpty(req.meta)) {
    response.meta = req.meta;
  }

  response.stack = err.stack && err.stack.split('\n');
  if (response.code === 410) {
    req.log.warn({error: err, url: req.url, stack: err.stack, sub_type: 'response_error'}, 'Error while serving the request');
  } else {
    req.log.error({error: err, url: req.url, stack: err.stack, sub_type: 'response_error'}, 'Error while serving the request');
  }


  req.responseError = response;
  res.status(code).json(response);
};

// -- Test Code ---------------------------------------------------------
if (require.main === module) {
  (function () {
    var title = 'testing';
    var err = new Error('err testing');
  })();
}
