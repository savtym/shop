'use strict';

var dbm;
var type;
var seed;

const defaultValues = [
	[
		1,
		1,
		2000,
		18
	], [
		1,
		3,
		1600,
		7
	], [
		2,
		2,
		2800,
		12
	], [
		3,
		2,
		3200,
		9
	]
];

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
	dbm = options.dbmigrate;
	type = dbm.dataType;
	seed = seedLink;
};

exports.up = function (db, callback) {
	return db.createTable('available', {
		id: {type: 'int', primaryKey: true, autoIncrement: true},
		product_id: {
			type: 'int',
			notNull: true,
			foreignKey: {
				name: 'available_product_id_fk',
				table: 'color',
				rules: {
					onDelete: 'CASCADE',
					onUpdate: 'RESTRICT'
				},
				mapping: 'id'
			}
		},
		color_id: {
			type: 'int',
			notNull: true,
			foreignKey: {
				name: 'available_color_id_fk',
				table: 'color',
				rules: {
					onDelete: 'CASCADE',
					onUpdate: 'RESTRICT'
				},
				mapping: 'id'
			}
		},
		price: {type: 'int', notNull: true},
		storage: {type: 'int', notNull: true}
	}, () => {
		for (let available of defaultValues) {
			db.insert('available', ['product_id', 'color_id', 'price', 'storage'], available, callback);
		}
	});
};

exports.down = function (db) {
	return db.dropTable('available');
};

exports._meta = {
	"version": 1
};
