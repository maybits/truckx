'use strict';

var dbslave = require('../cfg/model-config').dbslave;
var dbmaster = require('../cfg/model-config').dbmaster;
var Sequelize = require('sequelize');

var sequelize = new Sequelize({
  replication: {
    read: [
      {
        host    : dbslave.host,
        username: dbslave.user,
        password: dbslave.password,
        database: dbslave.database,
        port    : 3306
      }
    ],
    write: {
      host    : dbmaster.host,
      username: dbmaster.user,
      password: dbmaster.password,
      database: dbmaster.database,
      port    : 3306
    }
  },
  dialect       : 'mysql',
  dialectOptions: {
    supportBigNumbers: true,
    decimalNumbers   : true
  },
  pool: {
    max    : 15,
    min    : 3,
    idle   : 10000,
    acquire: 25000
  },
  timezone: 'Asia/Kolkata',
  define  : {
    freezeTableName: true,
    underscored    : true,
    timestamps     : true,
    indexes        : [
      // A BTREE index with a ordered field
      {
        method: 'BTREE',
        fields: [ 'created_at' ]
      },
      {
        method: 'BTREE',
        fields: [ 'updated_at' ]
      }
    ]
  },
  logging: true
});

module.exports = sequelize;
