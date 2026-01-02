//Controllers = Un archivo con handlers(funciones que reciben req y res)
// No saben nada de rutas ni de express. Solo saben: "Me llaman y respondo"
//Las validaciones de datos se hacen en el controller, no en la capa de acceso a los datos. 

const productRepository = require('../repositories/products.repository')



// GET /products

async function getAllProducts(req, res) {
    const products = await productRepository.getAll()
    res.json(products)
}


// GET /products/:id

async function getProductById(req, res) {
    const id = Number(req.params.id) //Convertimos el id de la petición a Number, porque todos los parámetros que nos llegan en la request son strings. 
    const product = await productRepository.getById(id)


    if (!product) {  //Si no se encuentra un producto con esa id, respondemos 404
        return res.status(404).json({ error: 'Product not found' })
    }


    res.json(product) //Si hay suerte, respondemos con el json del producto (Serializamos el elemento a enseñar)
}

//POST /products

async function createProduct(req, res) {
    const { name, price, quantity } = req.body //Extraemos la info de producto del body de la petición y las guardamos en constantes.

    const newProduct = await productRepository.create({
        name,
        price,
        quantity
    })


    res.status(201).json(newProduct) //Respuesta: nuevo producto creado, en formato JSON(serializado con el .json) + el status 201 = "Creado con éxito".

}


// PUT /products/:id

async function updateProduct(req, res) {

    const id = Number(req.params.id)

    const { name, price, quantity } = req.body

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
    const id = Number(req.params.id)

    const { name, price, quantity } = req.body

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
    const id = Number(req.params.id)
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