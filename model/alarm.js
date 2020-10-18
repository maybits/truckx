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
  type: {
    type     : Sequelize.ENUM,
    values: ['VIBRATION', 'OVERSPEED', 'CRASH', 'HARD_ACCELERATION', 'HARD_BRAKE','SHARP_TURN']
  },
  trigger_datetime: {
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
  },
  filelist: {
    type: Sequelize.TEXT,
    get() {
        var val = this.getDataValue('filelist');
        if(typeof(val)==='string')
            return JSON.parse(val);
        else
            return val;
    },
    set(val){
        if(typeof(val)!=='string')
            this.setDataValue('filelist',JSON.stringify(val));
        else
            this.setDataValue('filelist',val);
    }
  },
};

var options = {
  tableName: 'alarm',
  indexes  : [
    {
      fields: [ 'imei_id' ]
    },
    {
      fields: [ 'trigger_datetime' ],
      method: 'BTREE'
    }
  ]
};

var Alarm = sequelize.define(
  name,
  attributes,
  options
);
module.exports = Alarm;

///////////////////////////RELATIONSHIPS///////////////////////

var Dashcam = require('./dashcam');

Alarm.belongsTo(Dashcam, {'foreign_key': 'imei_id',targetKey: 'imei', as: 'alarms'});
