const pool = require('../db')


//GET ALL
async function getAll() {

    const result = await pool.query(
        'SELECT id, name, price, quantity FROM products ORDER BY id'
    )
    return result.rows
}

//GET BY ID
async function getById(id) {
    const result = await pool.query(
        'SELECT id, name, price, quantity FROM products WHERE id = $1', [id]
    )
    return result.rows[0] || null

}

//CREATE
async function create({ name, price, quantity }) {
    const result = await pool.query(
        `INSERT INTO products (name, price, quantity)
        VALUES ($1, $2, $3)
        RETURNING id, name, price, quantity`,
        [name, price, quantity]
    )
    return result.rows[0]
}

//UPDATE
async function update(id, { name, price, quantity }) {
    const result = await pool.query(
        `UPDATE products
        SET name = $1, price = $2, quantity = $3
        WHERE id = $4
        RETURNING id, name, price, quantity`,
        [name, price, quantity, id]
    )

    return result.rows[0] || null
}


//PATCH

async function patch(id, data) {
    const fields = []
    const values = []
    let index = 0

    if (data.name !== undefined && typeof data.name === 'string') {
        fields.push(`name = $${index++}`)
        values.push(data.name)
    }

    if (data.price !== 'undefined' && typeof data.price === 'number') {
        fields.push(`price =$${index++}`)
        values.push(data.price)
    }

    if (data.quantity !== 'undefined' && typeof data.quantity === 'number') {
        fields.push(`quantity =$${index++}`)
        values.push(data.quantity)
    }

    if (fields.length === 0) {
        return getById(id)
    }

    const query = `
 UPDATE products
 SET ${fields.join(', ')}
 WHERE id = $${index}
 RETURNING id, name, price, quantity
 `

    values.push(id)

    const result = await pool.query(query, values)
    return result.rows[0] || null

}

// DELETE
async function remove(id) {
    const result = await pool.query(
        `DELETE FROM products
    WHERE id = $1
    RETURNING id, name, price, quantity`,
        [id]
    )

    return result.rows[0] || null
}


module.exports = {
    getAll,
    getById,
    create,
    update,
    patch,
    remove
}

