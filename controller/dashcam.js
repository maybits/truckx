var _ = require('lodash');
var util = require('util');
var DashcamService = require('../service/dashcam');

DashcamController = {};

DashcamController.routeRequest = function(req, res, next){
  util.log('Logging request body: ==>', JSON.stringify(req.body));
  if (_.get(req, 'body.type', null) == 'LOGIN'){
  	util.log('Its a login request');
  	return DashcamService.setLoginInfo(_.get(req, 'body.imei', null))
  		.then(function(response){
  			req.res_data = response;
  			return next();
  		})
      .catch(function(error){
  			util.log('Error:', error);
  			return next(error);
  		});
  }
  if (_.get(req, 'body.type', null) == 'ALARM'){
  	util.log('Its an alarm');
  	return DashcamService.setAlarmInfo(_.get(req, 'body', null))
  		.then(function(response){
  			req.res_data = response;
  			return next();
  		})
      .catch(function(error){
  			util.log('Error:', error);
  			return next(error);
  		});
  }
  if (_.get(req, 'body.type', null) == 'LOCATION'){
  	util.log('Its an alarm');
  	return DashcamService.setLocationInfo(_.get(req, 'body', null))
  		.then(function(response){
  			req.res_data = response;
  			return next();
  		})
      .catch(function(error){
  			util.log('Error:', error);
  			return next(error);
  		});
  }
};

module.exports = DashcamController;
