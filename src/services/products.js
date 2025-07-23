const pool = require('../config/db');

class Products {
    async get_products() {
        const query = `
        WITH RECURSIVE category_tree AS (
          SELECT id, name, parent_id, 1 AS level
          FROM Categories
          WHERE parent_id IS NULL

          UNION ALL

          SELECT c.id, c.name, c.parent_id, ct.level + 1
          FROM Categories c
          JOIN category_tree ct ON c.parent_id = ct.id
        )
        SELECT 
          ct.id AS category_id,
          ct.name AS category_name,
          ct.level,
          p.id AS product_id,
          p.name AS product_name,
          p.price
        FROM category_tree ct
        LEFT JOIN Products p ON p.category_id = ct.id
        WHERE p.id IS NOT NULL
        ORDER BY ct.level, ct.parent_id, ct.name, p.name`;
        const { rows } = await pool.query(query);
        return rows;
    }

    async create_product(name, price, categoryId) {
        const query = `
        INSERT INTO Products (name, price, category_id)
        VALUES ($1, $2, $3)
        RETURNING *`;
        const { rows } = await pool.query(query, [name, price, categoryId]);
        return rows[0];
    }

    async update_product(id, name, price, categoryId) {
    const query = `
        UPDATE Products
        SET name = $1, price = $2, category_id = $3
        WHERE id = $4
        RETURNING *`;
        const { rows } = await pool.query(query, [name, price, categoryId, id]);
        return rows[0];
    }

    async remove_product(id) {
        const query = 'DELETE FROM Products WHERE id = $1';
        await pool.query(query, [id]);
        return { id };
    }   
}

module.exports = new Products();