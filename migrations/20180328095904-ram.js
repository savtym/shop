'use strict';

var dbm;
var type;
var seed;

const defaultValues = ['1GB', '2GB', '4GB'];

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
    return db.createTable('ram', {
        id: {type: 'int', primaryKey: true, autoIncrement: true},
        size: {type:'string', unique: true, notNull: true}
    }, () => {
        for (let size of defaultValues) {
            db.insert('ram', ['size'], [size], callback);
        }
    });
};

exports.down = function(db) {
    return db.dropTable('ram');
};

exports._meta = {
  "version": 1
};
