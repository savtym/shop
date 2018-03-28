'use strict';

var dbm;
var type;
var seed;

const defaultValues = ['ios', 'android'];

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
    return db.createTable('os', {
        id: {type: 'int', primaryKey: true, autoIncrement: true},
        name: {type:'string', unique: true, notNull: true}
    }, () => {
        for (let os of defaultValues) {
            db.insert('os', ['name'], [os], callback);
        }
    });
};

exports.down = function(db) {
    return db.dropTable('os');
};

exports._meta = {
  "version": 1
};
