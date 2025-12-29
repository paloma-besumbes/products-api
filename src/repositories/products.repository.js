let products = []
let nextId = 1

function getAll() {
    return products
}

function getById(id) {
    return products.find(p => p.id === id)

}

function create({ name, price, quantity }) {
    const newProduct = {
        id: nextId,
        name,
        price,
        quantity
    }

    nextId++
    products.push(newProduct)
}

function update(id, data) {
    const product = products.find(p => p.id === id)
    if (!product) return null


    product.name = data.name
    product.price = data.price
    product.quantity = data.quantity
    return product
}


function patch(id, data) {
    const product = products.find(p => p.id === id)

    if (!product) return null

    if (data.name !== undefined) product.name = data.name
    if (data.price !== undefined) product.price = data.price
    if (data.quantity !== undefined) product.quantity = data.quantity
    return product
}


function remove(id) {
    const index = products.findIndex(p => p.id === id)
    if (index === -1) return null
    const [deleted] = products.splice(index, 1)
    return deleted
}


module.exports = {
    getAll,
    getById,
    create,
    update,
    patch,
    remove
}

