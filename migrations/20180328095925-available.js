'use strict';

var dbm;
var type;
var seed;

const defaultValues = [
    [
        1,
        2000,
        18
    ], [
        3,
        1600,
        7
    ], [
        2,
        2800,
        12
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
        available: {type: 'int', notNull: true}
    }, () => {
        for (let available of defaultValues) {
            db.insert('available', ['color_id', 'price', 'available'], available, callback);
        }
    });
};

exports.down = function (db) {
    return db.dropTable('available');
};

exports._meta = {
    "version": 1
};
