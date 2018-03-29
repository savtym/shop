'use strict';

var dbm;
var type;
var seed;

const defaultValues = [
    [1, 2],
    [1, 3]
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
  return db.createTable('cart', {
      id: {type: 'int', primaryKey: true, autoIncrement: true},
      user_id: {
          type: 'int',
          notNull: true,
          foreignKey: {
              name: 'cart_user_id_fk',
              table: 'users',
              rules: {
                  onDelete: 'CASCADE',
                  onUpdate: 'RESTRICT'
              },
              mapping: 'id'
          }
      },
      product_id: {
          type: 'int',
          notNull: true,
          foreignKey: {
              name: 'cart_product_id_fk',
              table: 'product',
              rules: {
                  onDelete: 'CASCADE',
                  onUpdate: 'RESTRICT'
              },
              mapping: 'id'
          }
      }
  }, () => {
      for (let order of defaultValues) {
          db.insert('cart', ['user_id', 'product_id'], order, callback);
      }
  });
};

exports.down = function(db) {
  return db.dropTable('cart');
};

exports._meta = {
  "version": 1
};
