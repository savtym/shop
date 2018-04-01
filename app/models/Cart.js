const User = require('./User');
const GET_PRODUCTS_DB = require('./Product').GET_PRODUCTS_DB;

const GET_PRODUCTS_BY_ID = {
	select: 'ct.counter',
	join: `
		JOIN (
			SELECT ct.product_id, COUNT (*) AS counter
			FROM cart AS ct
			WHERE user_id = $1
			GROUP BY ct.product_id
		) AS ct ON p.id = ct.product_id
	`,
	groupBy: 'ct.counter'
};
const GET_AVAILABLE_DB = `
SELECT a.storage 
FROM available AS a
WHERE a.id = $1 AND a.product_id = $2;`;

const INSERT_PRODUCT_DB = 'INSERT INTO cart (user_id, product_id, available_id) VALUES ($1, $2, $3)';
const DELETE_PRODUCT_DB = (all) => `
DELETE FROM cart 
WHERE 
    id IN (
        SELECT id
        FROM cart
        WHERE available_id = $1
        LIMIT ${all}
    );
`;
const DELETE_PRODUCTS_DB = 'DELETE FROM cart WHERE user_id = $1';

class Cart {

	static async showProcuts(req, res) {
		const per = await User.permissions(req, res);
		if (!per) return;

		let {rows, err} = await this.db.query(GET_PRODUCTS_DB(GET_PRODUCTS_BY_ID), [per.id]);

		if (err) {
			res.status(400).json(err.message);
			return false;
		}

		res.json(rows);
	}


	static async addProduct(req, res) {
		const per = await User.permissions(req, res);
		if (!per) return;

		const {product_id, available_id} = req.body;

		let {rows, err} = await this.db.query(GET_AVAILABLE_DB, [per.id, product_id]);

		if (err) {
			res.status(400).json(err.message);
			return false;
		}

		if (rows.length !== 0 && rows[0].available === 0) {
			res.status(204).json("Don't have an available product");
			return false;
		}

		const answer = await this.db.query(INSERT_PRODUCT_DB, [per.id, product_id, available_id]);

		if (answer.err) {
			res.status(400).json(answer.err.message);
			return false;
		}
		res.json(true);
	}


	static async removeProduct(req, res) {
		const per = await User.permissions(req, res);
		if (!per) return;

		const {available_id, isAll} = req.body;

		if (typeof(+available_id) !== 'number') {
			res.status(400).json("Don't have a parameter product_id");
			return false;
		}

		const {err} = await this.db.query(DELETE_PRODUCT_DB(isAll ? 'ALL' : 1), [available_id]);

		if (err) {
			res.status(400).json(err.message);
			return false;
		}

		res.json(true);
	}


	static async clearProducts(req, res) {
		const per = await User.permissions(req, res);
		if (!per) return;

		const {err} = await this.db.query(DELETE_PRODUCTS_DB, [per.id]);

		if (err) {
			res.status(400).json(err.message);
			return false;
		}

		res.json(true);
	}
}


module.exports = Cart;
