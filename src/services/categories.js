const pool = require('../config/db');

class Categories {
    async get_categories() {
        const query = `
        SELECT 
        c.id, c.name, c.level, c.parent_id,
        COUNT(p.id) AS products_count
        FROM Categories c
        LEFT JOIN Products p ON p.category_id = c.id
        GROUP BY c.id
        ORDER BY c.level, COALESCE(c.parent_id, 0), c.name`;
        const { rows } = await pool.query(query);
        return rows;
    }

    async create_category(name, level, parent_id) {
        const query = `
          INSERT INTO Categories (name, level, parent_id)
          VALUES ($1, $2, $3)
          RETURNING *`;
        const { rows } = await pool.query(query, [name, level, parentId]);
        return rows[0];
    }

    async update_category(id, name) {
        const query = `
        UPDATE Categories
        SET name = $1
        WHERE id = $2
        RETURNING *`;
        const { rows } = await pool.query(query, [name, id]);
        return rows[0];
    }

    async remove_category(id) {
        const checkQuery = `
          SELECT COUNT(*) FROM Categories WHERE parent_id = $1
          UNION ALL
          SELECT COUNT(*) FROM Products WHERE category_id = $1`;
        const { rows } = await pool.query(checkQuery, [id]);

        const deleteQuery = 'DELETE FROM Categories WHERE id = $1';
        await pool.query(deleteQuery, [id]);
        return { id };
    }
}

module.exports = new Categories();