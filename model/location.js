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
  imei_id: {
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
      fields: [ 'imei_id' ]
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

Location.belongsTo(Dashcam, {'foreign_key': 'imei_id', targetKey: 'imei', as: 'locations'});



