'use strict';

var Sequelize = require('sequelize');
var sequelize = require('./db');
var _         = require('lodash');

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

Dashcam.hasMany(Location, {as: 'locations'});

Dashcam.hasMany(Alarm, {as: 'alarms'});

Dashcam.addScope('full', {
  include: [
    {
      model: Location,
      as   : 'locations'
    },
    {
        	model: Alarm,
        	ad   : 'alarms'
    }
  ]
});
///////////////////////////Functions///////////////////////


Dashcam.findByImei = function(imei) {
  return Dashcam.findOne({where: {imei: imei}});
};








