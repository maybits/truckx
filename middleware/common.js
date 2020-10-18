
var _ = require('lodash');
var Uuid          = require('uuid');


module.exports = {

  sendJSON: function sendJSON(req, res, next) {
    var message = {};
    if (req.response_title && req.response_message) {
      message = {
        title  : req.response_title,
        message: req.response_message
      };
    }

    res.json({
      error : null,
      code  : 200,
      status: {
        result : 'success',
        message: message
      },
      body: (req.res_data || {}),
      meta: (req.meta || {requestid: _.get(req, 'session_id', '') || null})
    });
  },
  createSession: function createSession(req, res, next) {
    req.session_id = Uuid.v4();
    return next();
  }
};
