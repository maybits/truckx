'use strict';

var Common = require('../middleware/common');
var DashcamController = require('../controller/dashcam');
var AdminController = require('../controller/admin');
var Error = require('../middleware/error');

module.exports = function(app){

  app.post('/v1/dashcam/details', Common.createSession, DashcamController.routeRequest, Common.sendJSON, Error);
  app.get('/v1/admin/fetch_alarm', Common.createSession, AdminController.getAlarmDetailsByImei, Common.sendJSON, Error);

};
