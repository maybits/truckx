'use strict';

var Sequelize = require('sequelize');
var sequelize = require('./db');
var _         = require('lodash');
var util = require('util');

var name = 'dashcam';

var attributes = {
  imei: {
    type      : Sequelize.INTEGER,
    primaryKey: true
  },
  is_active: {
    type     : Sequelize.BOOLEAN,
    allowNull: false
  },
  vehicle_number: {
    type     : Sequelize.STRING,
    allowNull: false
  },
  last_logged_in: {
    type     : Sequelize.DATE,
    allowNull: true
  }
};

var options = {
  tableName: 'dashcam',
  indexes  : [
    {
      fields: [ 'vehicle_number' ]
    },
    {
      fields: [ 'last_logged_in' ],
      method: 'BTREE'
    }
  ]
};

var Dashcam = sequelize.define(
  name,
  attributes,
  options
);
module.exports = Dashcam;


///////////////////////////RELATIONSHIPS///////////////////////

var Location = require('./location');
var Alarm = require('./alarm');

Dashcam.hasMany(Location, {as: 'locations', foreignKey: 'imei_id'});

Dashcam.hasMany(Alarm, {as: 'alarms', foreignKey: 'imei_id'});

Dashcam.addScope('full', {
  include: [
    {
      model: Location,
      as   : 'locations'
    },
    {
      model: Alarm,
      as   : 'alarms'
    }
  ]
});
///////////////////////////Functions///////////////////////


Dashcam.findByImei = function(imei) {
  return Dashcam.findOne({where: {imei: imei}});
};

Dashcam.getAlarmsByFilter = function(imei, filters){
  var query = {
    attributes: [ 'imei', 'is_active', 'vehicle_number', 'last_logged_in' ],
    where     : { imei: imei},
    include   : [
      {
        model     : Alarm,
        as        : 'alarms',
        attributes: [ 'type', 'trigger_datetime', 'filelist' ],
        where     : {}
      }
    ]
  };

  if (_.get(filters, 'start_time', null)!= null && _.get(filters, 'end_time', null)!= null){
  	query.include[0].where.trigger_datetime = { $between: [ _.get(filters, 'start_time', null), _.get(filters, 'end_time', null) ]};
  }

  if (_.get(filters, 'alarm_type', null) != null){
  	query.include[0].where.type = _.get(filters, 'alarm_type', null);
  }
  util.log('Query run :', JSON.stringify(query));

  return Dashcam.findAll(query);
};

if (require.main === module) {
  Dashcam.getAlarms('2020-08-17 16:45:35',  '2020-08-19 16:45:35')
    .then(function (value) {
      console.log(JSON.stringify(value));
    });
}









