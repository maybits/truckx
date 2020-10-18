'use strict';

var Common = require('../middleware/common');
var DashcamController = require('../controller/dashcam');
var Error = require('../middleware/error');

module.exports = function(app){

  app.post('/v1/dashcam/details', Common.createSession, DashcamController.routeRequest, Common.sendJSON, Error);
};
