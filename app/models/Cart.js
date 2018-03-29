
const User = require('./User');


const GET_AVAILABLE_DB = `
SELECT a.storage 
FROM available AS a
WHERE a.id = $1 AND a.product_id = $2;`;

const INSERT_PRODUCT_DB = 'INSERT INTO cart (user_id, product_id) VALUES ($1, $2)';
const DELETE_PRODUCT_DB = (all) => `
DELETE FROM cart 
WHERE 
    id IN (
        SELECT id
        FROM cart
        WHERE user_id = $1 AND product_id = $2
        LIMIT ${all}
    );
`;
const DELETE_PRODUCTS_DB = 'DELETE FROM cart WHERE user_id = $1';

class Cart {
    static async addProduct(req, res) {
        const per = await User.permissions(req, res);
        if (!per) return;

        const {product_id} = req.body;

        let {rows, err} = await this.db.query(GET_AVAILABLE_DB, [per.id, product_id]);

        if (err) {
            res.status(400).json(err.message);
            return false;
        }

        if (rows.length !== 0 && rows[0].available === 0) {
            res.status(204).json("Don't have an available product");
            return false;
        }

        const answer = await this.db.query(INSERT_PRODUCT_DB, [per.id, product_id]);

        if (answer.err) {
            res.status(400).json(answer.err.message);
            return false;
        }
        res.send(true);
    }


    static async removeProduct(req, res) {
        const per = await User.permissions(req, res);
        if (!per) return;

        const {product_id, isAll} = req.body;

        if (typeof(+product_id) !== 'number') {
            res.status(400).json("Don't have a parameter product_id");
            return false;
        }

        const {err} = await this.db.query(DELETE_PRODUCT_DB(isAll ? 'ALL' : 1), [per.id, product_id]);

        if (err) {
            res.status(400).json(err.message);
            return false;
        }

        res.send(true);
    }


    static async clearProducts(req, res) {
        const per = await User.permissions(req, res);
        if (!per) return;

        const {err} = await this.db.query(DELETE_PRODUCTS_DB, [per.id]);

        if (err) {
            res.status(400).json(err.message);
            return false;
        }

        res.send(true);
    }
}


module.exports = Cart;
