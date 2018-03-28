'use strict';

var dbm;
var type;
var seed;

const defaultValues = [5, 8, 12];

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
    return db.createTable('camera', {
        id: {type: 'int', primaryKey: true, autoIncrement: true},
        size: {type:'int', unique: true, notNull: true,}
    }, () => {
        for (let size of defaultValues) {
            db.insert('camera', ['size'], [size], callback);
        }
    });
};

exports.down = function(db) {
    return db.dropTable('camera');
};

exports._meta = {
  "version": 1
};
