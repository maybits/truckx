'use strict';

var Sequelize = require('sequelize');
var sequelize = require('./db');
var _         = require('lodash');

var name = 'alarm';

var attributes = {
  id: {
    type         : Sequelize.INTEGER,
    primaryKey   : true,
    autoIncrement: true
  },
  imei: {
    type     : Sequelize.INTEGER,
    allowNull: false
  },
  datetime: {
    type     : Sequelize.DATE,
    allowNull: false
  },
  lat: {
    type     : Sequelize.FLOAT,
    allowNull: true
  },
  lng: {
    type     : Sequelize.FLOAT,
    allowNull: true
  }
};

var options = {
  tableName: 'location',
  indexes  : [
    {
      fields: [ 'imei' ]
    },
    {
      fields: [ 'datetime' ],
      method: 'BTREE'
    }
  ]
};

var Location = sequelize.define(
  name,
  attributes,
  options
);
module.exports = Location;

///////////////////////////RELATIONSHIPS///////////////////////

var Dashcam = require('./dashcam');
var Alarm = require('./alarm');

Location.belongsTo(Dashcam, {'foriegn_key': 'imei'});



