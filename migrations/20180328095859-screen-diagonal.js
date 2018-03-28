'use strict';

var dbm;
var type;
var seed;

const defaultValues = ['3.5"-4.1"', '4.2"-5"'];

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
    return db.createTable('screen_diagonal', {
        id: {type: 'int', primaryKey: true, autoIncrement: true},
        size: {type:'string', unique: true, notNull: true}
    }, () => {
        for (let size of defaultValues) {
            db.insert('screen_diagonal', ['size'], [size], callback);
        }
    });
};

exports.down = function(db) {
    return db.dropTable('screen_diagonal');
};

exports._meta = {
  "version": 1
};
