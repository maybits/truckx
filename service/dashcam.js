var _ = require('lodash');
var util = require('util');
var moment = require('moment');
var DashcamModel = require('../model/dashcam');
var AlarmModel = require('../model/alarm');
var LocationModel = require('../model/location');


DashcamService ={};


DashcamService.setLoginInfo = function(imei){
  util.log('Service: Dashcam, Function: setLoginInfo, IMEI: ', imei);
  return DashcamModel.update({last_logged_in: moment().format('YYYY-MM-DD HH:mm:ss'), is_active: 1 }, { where: { imei: imei }})
    .then(function(dashcam_detail){
      util.log('Dashcam Details: ', JSON.stringify(dashcam_detail));
      return dashcam_detail;
    });

};

DashcamService.setAlarmInfo = function(alarm_info){
  var alarm = {
    imei            : _.get(alarm_info, 'imei'),
    type            : _.get(alarm_info, 'alarm_type'),
    trigger_datetime: _.get(alarm_info, 'alarm_time'),
    lat             : _.get(alarm_info, 'latitude'),
    lng             : _.get(alarm_info, 'longitude'),
    filelist        : _.get(alarm_info, 'file_list')
  };
  util.log('Service: Dashcam, Function: setAlarmInfo, ALARM: ', JSON.stringify(alarm));
  return AlarmModel.create(alarm)
    .then(function(alarm_details){
      util.log('Alarm Details: ', JSON.stringify(alarm_details));
      return alarm_details;
    });

};

DashcamService.setLocationInfo = function(location_info){
  var location = {
    imei    : _.get(location_info, 'imei'),
    datetime: _.get(location_info, 'location_time'),
    lat     : _.get(location_info, 'latitude'),
    lng     : _.get(location_info, 'longitude')
  };
  util.log('Service: Dashcam, Function: setLocationInfo, LOCATION: ', JSON.stringify(location));
  return LocationModel.create(location)
    .then(function(location_detail){
      util.log('Location Details: ', JSON.stringify(location_detail));
      return location_detail;
    });

};

module.exports= DashcamService;
