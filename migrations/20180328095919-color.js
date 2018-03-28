'use strict';

var dbm;
var type;
var seed;

const defaultValues = ['black', 'gray', 'white'];


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
    return db.createTable('color', {
        id: {type: 'int', primaryKey: true, autoIncrement: true},
        name: {type:'string', unique: true, notNull: true}
    }, () => {
        for (let color of defaultValues) {
            db.insert('color', ['name'], [color], callback);
        }
    });
};

// exports.up = function(db) {
//     return db.insert('color', ['name'], ['black', 'gray', 'white'], callback);
// };

exports.down = function(db) {
    return db.dropTable('color');
};

exports._meta = {
  "version": 1
};
