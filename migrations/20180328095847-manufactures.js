'use strict';

var dbm;
var type;
var seed;

const defaultValuesManufactures = ['Apple', 'Samsung', 'Alcatel'];
const defaultValuesModels = ['5s', '7', 's8', 's9', 'wq-320'];

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
    }, () =>
			db.createTable('model', {
				id: {type: 'int', primaryKey: true, autoIncrement: true},
				name: {type:'string', unique: true, notNull: true}
			},

			() => {
        for (let manufacture of defaultValuesManufactures) {
            db.insert('manufacture', ['name'], [manufacture], callback);
        }

        for (let model of defaultValuesModels) {
            db.insert('model', ['name'], [model], callback);
        }
    }));
};

exports.down = function(db) {
    return db.dropTable('manufacture', () => db.dropTable('model'));
};

exports._meta = {
  "version": 1
};
