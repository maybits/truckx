var _ = require('lodash');
var util = require('util');
var Promise = require('bluebird');
var DashcamModel = require('../model/dashcam');
var AlarmModel = require('../model/alarm');
var LocationModel = require('../model/location');
var util = require('util');
AdminController = {};

AdminController.getAlarmDetailsByImei = function(req, res, next) {
  util.log('Controller: AdminController, Function: getAlarmDetailsByImei, query_params', JSON.stringify(req.query));
  var imei = _.get(req, 'query.imei', null);
  var scope = 'full';
  var filters = {
    start_time: _.get(req, 'query.start_time', null),
    end_time  : _.get(req, 'query.end_time', null),
    alarm_type: _.get(req, 'query.alarm_type', null)
  };
  util.log('Filters applied are ', JSON.stringify(filters));

  return DashcamModel.getAlarmsByFilter(imei, filters)
    .then(function(data) {
      if (!data) {
        var error = new Error('missing_imei');
        return next(error);
      }
      req.res_data  = data;
      return next();
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports = AdminController;
