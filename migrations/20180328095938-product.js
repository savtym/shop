'use strict';

var dbm;
var type;
var seed;

const defaultValues = [
  [2, 1, 2, 3, 5, 3],
  [1, 2, 1, 1, 2, 1],
  [1, 2, 1, 1, 1, 1],
  [3, 1, 3, 2, 4, 2],
  [3, 1, 3, 2, 3, 2]
];

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
    return db.createTable('product', {
        id: {type: 'int', primaryKey: true, autoIncrement: true},
        camera_id: {
            type: 'int',
            notNull: true,
            foreignKey: {
                name: 'product_camera_id_fk',
                table: 'camera',
                rules: {
                    onDelete: 'CASCADE',
                    onUpdate: 'RESTRICT'
                },
                mapping: 'id'
            }
        },
        screen_diagonal_id: {
            type: 'int',
            notNull: true,
            foreignKey: {
                name: 'product_screen_diagonal_id_fk',
                table: 'screen_diagonal',
                rules: {
                    onDelete: 'CASCADE',
                    onUpdate: 'RESTRICT'
                },
                mapping: 'id'
            }
        },
        ram_id: {
            type: 'int',
            notNull: true,
            foreignKey: {
                name: 'product_ram_id_fk',
                table: 'ram',
                rules: {
                    onDelete: 'CASCADE',
                    onUpdate: 'RESTRICT'
                },
                mapping: 'id'
            }
        },
        manufacture_id: {
            type: 'int',
            notNull: true,
            foreignKey: {
                name: 'product_manufacture_id_fk',
                table: 'manufacture',
                rules: {
                    onDelete: 'CASCADE',
                    onUpdate: 'RESTRICT'
                },
                mapping: 'id'
            }
        },
        model_id: {
            type: 'int',
            notNull: true,
            foreignKey: {
                name: 'product_model_id_fk',
                table: 'model',
                rules: {
                    onDelete: 'CASCADE',
                    onUpdate: 'RESTRICT'
                },
                mapping: 'id'
            }
        },
        available_id: {
            type: 'int',
            notNull: true,
            foreignKey: {
                name: 'product_available_id_fk',
                table: 'available',
                rules: {
                    onDelete: 'CASCADE',
                    onUpdate: 'RESTRICT'
                },
                mapping: 'id'
            }
        },
        description: 'string'
    }, () => {
        const fields = ['camera_id', 'screen_diagonal_id', 'ram_id', 'manufacture_id', 'model_id', 'available_id'];
        for (let product of defaultValues) {
            db.insert('product', fields, product, callback);
        }
    });
};

exports.down = function(db) {
  return db.dropTable('product');
};

exports._meta = {
  "version": 1
};
