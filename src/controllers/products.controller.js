//Controllers = Un archivo con handlers(funciones que reciben req y res)
// No saben nada de rutas ni de express. Solo saben: "Me llaman y respondo"
//Las validaciones de datos se hacen en el controller, no en la capa de acceso a los datos. 

const productRepository = require('../repositories/products.repository')


//Utilidad para validar IDs

function parseId(param) {
    const id = Number(param) //Convertimos el id de la petición a Number, porque todos los parámetros que nos llegan en la request son strings. 

    return Number.isInteger(id) && id > 0 ? id : null
}



// GET /products

async function getAllProducts(req, res) {

    const page = req.query.page ? Number(req.query.page) : 1
    const limit = req.query.limit ? Number(req.query.limit) : 10

    //Validaciones

    if (!Number.isInteger(page) || page < 1) {
        return res.status(400).json({ error: 'Invalid page parameter' })
    }

    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
        return res.status(400).json({ error: 'Invalid limit parameter' })
    }


    const offset = (page - 1) * limit // Punto de partida a la hora de mostrar los productos (Número de filas que se salta antes de empezar).


    const [products, totalCount] = await Promise.all([ //Ejecuta ambas queries en paralelo.
        productRepository.getAll({ limit, offset }),
        productRepository.countAll()
    ])


    res.json({
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
        count: products.length,
        data: products
    })
}


// GET /products/:id

async function getProductById(req, res) {
    const id = parseId(req.params.id)


    if (!id) {
        return res.status(400).json({ error: 'Invalid product id' })
    }

    const product = await productRepository.getById(id)



    if (!product) {  //Si no se encuentra un producto con esa id, respondemos 404
        return res.status(404).json({ error: 'Product not found' })
    }


    res.json(product) //Si hay suerte, respondemos con el json del producto (Serializamos el elemento a enseñar)
}



//POST /products

async function createProduct(req, res) {
    const { name, price, quantity } = req.body //Extraemos la info de producto del body de la petición y las guardamos en constantes.


    //Validaciones

    if (
        typeof name !== 'string' ||
        typeof price !== 'number' ||
        typeof quantity !== 'number'
    ) {
        return res.status(400).json({
            error: 'Invalid product data'
        })
    }


    const newProduct = await productRepository.create({
        name,
        price,
        quantity
    })


    res.status(201).json(newProduct) //Respuesta: nuevo producto creado, en formato JSON(serializado con el .json) + el status 201 = "Creado con éxito".

}


// PUT /products/:id

async function updateProduct(req, res) {

    const id = parseId(req.params.id)

    const { name, price, quantity } = req.body


    if (!id) {
        return res.status(400).json({ error: 'Invalid product id' })
    }

    if (
        typeof name !== 'string' ||
        typeof price !== 'number' ||
        typeof quantity !== 'number'
    ) {
        return res.status(400).json({
            error: 'Invalid product data'
        })
    }


    const updatedProduct = await productRepository.update(id, {
        name,
        price,
        quantity
    })

    if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' })
    }

    res.json(updatedProduct)



}


// PATCH /products/:id

async function patchProduct(req, res) {
    const id = parseId(req.params.id)

    const { name, price, quantity } = req.body




    if (!id) {
        return res.status(400).json({ error: 'Invalid product id' })
    }

    //  Validaciones parciales
    if (name !== undefined && typeof name !== 'string') {
        return res.status(400).json({ error: 'Invalid name' })
    }

    if (price !== undefined && typeof price !== 'number') {
        return res.status(400).json({ error: 'Invalid price' })
    }

    if (quantity !== undefined && typeof quantity !== 'number') {
        return res.status(400).json({ error: 'Invalid quantity' })
    }

    const updatedProduct = await productRepository.patch(id, {
        name,
        price,
        quantity
    })


    if (!updatedProduct) {

        return res.status(404).json({ error: 'Product not found' })
    }

    res.json(updatedProduct)

}



// DELETE /products/:id

async function deleteProduct(req, res) {
    const id = parseId(req.params.id)

    if (!id) {
        return res.status(400).json({ error: 'Invalid product id' })
    }




    const deletedProduct = await productRepository.remove(id)


    if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' })
    }


    res.json({
        message: 'Product deleted',
        product: deletedProduct
    })

}


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
}