const User = require('./User');

const GET_PRODUCTS_BY_ID = `
SELECT 
	p.id AS product_id,
	ct.available_id,
	COUNT (*) AS counter,
	json_build_object('color', a.name, 'price', a.price, 'storage', a.storage) AS available,
	p.manufacture,
	p.ram,
	p.camera,
	p.screen_diagonal,
	p.description
FROM cart AS ct
JOIN (
		SELECT 
			p.id,
			m.name AS manufacture,
			r.size AS ram,
			c.size AS camera, 
			sd.size AS screen_diagonal,
			description 
		FROM product AS p
		JOIN camera AS c ON p.camera_id = c.id
		JOIN screen_diagonal AS sd ON p.screen_diagonal_id = sd.id
		JOIN ram AS r ON p.ram_id = r.id
		JOIN manufacture AS m ON p.manufacture_id = m.id
		GROUP BY p.id, manufacture, ram, camera, screen_diagonal
	) AS p ON p.id = ct.product_id
JOIN (
		SELECT a.id, c.name, a.price, a.storage 
		FROM available as a 
		JOIN color as c on c.id = a.color_id
	) AS a ON ct.available_id = a.id
WHERE user_id = $1
GROUP BY p.id, ct.available_id, ct.product_id, p.description, a.name, a.price, a.storage, 
	p.manufacture, p.ram, p.camera, p.screen_diagonal, p.description
`;

const GET_AVAILABLE_DB = `
SELECT a.storage 
FROM available AS a
WHERE a.id = $1 AND a.product_id = $2
`;

const INSERT_PRODUCT_DB = 'INSERT INTO cart (user_id, product_id, available_id) VALUES ($1, $2, $3)';
const DELETE_PRODUCT_DB = (all) => `
DELETE FROM cart 
WHERE 
    id IN (
        SELECT id
        FROM cart
        WHERE user_id = $1 AND product_id = $2 AND available_id = $3
        LIMIT ${all}
    );
`;
const DELETE_PRODUCTS_DB = 'DELETE FROM cart WHERE user_id = $1';

class Cart {

	static async showProcuts(req, res) {
		const per = await User.permissions(req, res);
		if (!per) return;

		let {rows, err} = await this.db.query(GET_PRODUCTS_BY_ID, [per.id]);

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

		const {product_id, available_id, isAll} = req.body;

		if (typeof(+available_id) !== 'number') {
			res.status(400).json("Don't have a parameter product_id");
			return false;
		}

		const {err} = await this.db.query(DELETE_PRODUCT_DB(isAll ? 'ALL' : 1), [per.id, product_id, available_id]);

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
