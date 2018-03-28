'use strict';

var dbm;
var type;
var seed;

const defaultValues = ['Apple', 'Samsung', 'Alcatel'];

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
    return db.createTable('manufacture', {
        id: {type: 'int', primaryKey: true, autoIncrement: true},
        name: {type:'string', unique: true, notNull: true}
    }, () => {
        for (let manufacture of defaultValues) {
            db.insert('manufacture', ['name'], [manufacture], callback);
        }
    });
};

exports.down = function(db) {
    return db.dropTable('manufacture');
};

exports._meta = {
  "version": 1
};
