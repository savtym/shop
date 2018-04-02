
const GET_PRODUCTS_DB = `
SELECT 
	p.id AS product_id,
	a.id AS available_id,
	m.name AS manufacture,
	model.name AS model,
	r.size AS ram,
	c.size AS camera, 
	sd.size AS screen_diagonal,
	json_agg(json_build_object('color', a.name, 'price', a.price, 'storage', a.storage)) AS available,
	description 
FROM product AS p
JOIN camera AS c ON p.camera_id = c.id
JOIN screen_diagonal AS sd ON p.screen_diagonal_id = sd.id
JOIN ram AS r ON p.ram_id = r.id
JOIN manufacture AS m ON p.manufacture_id = m.id
JOIN model AS model ON p.model_id = model.id
JOIN (
		SELECT a.id, a.product_id, c.name, a.price, a.storage 
		FROM available as a 
		JOIN color as c on c.id = a.color_id
	) AS a ON p.available_id = a.product_id
GROUP BY p.id, a.id, manufacture, model, ram, camera, screen_diagonal
`;


class Product {

    static async getProducts(req, res) {
        const {rows, err} = await this.db.query(GET_PRODUCTS_DB, []);

        if (err) {
            res.status(400).json(err.message);
            return false;
        }

        res.json(rows);
    }
}

module.exports = Product;
