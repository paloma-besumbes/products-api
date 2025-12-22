//Controllers = Un archivo con handlers(funciones que reciben req y res)
// No saben nada de rutas ni de express. Solo saben: "Me llaman y respondo"


let products = []
let nextId = 1

function getAllProducts(req, res) {
    res.json(products)
}

function getProductById(req, res) {
    const id = Number(req.params.id) //Convertimos el id de la petición a Number, porque todos los parámetros que nos llegan en la request son strings. 
    const product = products.find(p => p.id === id) //La variable 'p' va recorriendo los 'id' de todos los elementos del array 'products', hasta dar con el producto que coincida en id con el de la request. 


    if (!product) {  //Si no se encuentra un producto con esa id, respondemos 404
        return res.status(404).json({ error: 'Product not found' })
    }


    res.json(product) //Si hay suerte, respondemos con el json del producto (Serializamos el elemento a enseñar)
}

function createProduct(req, res) {
    const { name, price, quantity } = req.body //Extraemos la info de producto del body de la petición y las guardamos en constantes.

    const newProduct = {  //Creamos el nuevo producto que presentará el servidor en su BD, con la info que recibimos en la petición y un id que le asignamos aquí.
        id: nextId,
        name,
        price,
        quantity
    }

    nextId++ //Sumamos 1 a la variable que asigna los id, de forma que la próxima vez que se llame a post, el producto añadido tendrá un id diferente. 
    products.push(newProduct) //Añadimos el producto(objeto) recién creadon al final del array de productos que tenemos en la 'BD'.

    res.status(201).json(newProduct) //Respuesta: nuevo producto creado, en formato JSON(serializado con el .json) + el status 201 = "Creado con éxito".

}

function updateProduct(req, res) {

    const id = Number(req.params.id)

    const product = products.find(p => p.id === id)


    if (!product) {
        return res.status(404).json({ error: 'Product not found' })
    }


    //Si no incluimos cualquiera de las siguientes variables, dejarán de aparecer los valores que tuviera anteriormente.
    //Para alterar solo algunos valores específicos debemos usar PATCH. 

    const { name, price, quantity } = req.body
    product.name = name
    product.price = price
    product.quantity = quantity

    res.json(product)

}


function patchProduct(req, res) {
    const id = Number(req.params.id)

    const product = products.find(p => p.id === id)

    const { name, price, quantity } = req.body

    //A continuación, tratamos los posibles errores:  Que no se encuentre el producto que queremos parchear o que se introduzcan datos inválidos. 

    if (!product) {

        return res.status(404).json({ error: 'Product not found' })
    }

    if (name !== undefined && typeof name !== 'string') {
        return res.status(400).json({ error: 'Invalid name' })
    }

    if (price !== undefined && typeof price !== 'number') {
        return res.status(400).json({ error: 'Invalid price' })
    }

    if (quantity !== undefined && typeof quantity !== 'number') {
        return res.status(400).json({ error: 'Invalid quantity' })
    }


    //Pasados estos contrles, si una de las variables está modificada, la actualizamos en el objeto de la base de datos. 

    if (name !== undefined) product.name = name //Usando undefined permitimos valores falsy, como 0, y evitamos que se borren datos sin querer. 
    if (price !== undefined) product.price = price
    if (quantity !== undefined) product.quantity = quantity


    res.json(product)

}

function deleteProduct(req, res) {
    const id = Number(req.params.id)

    const index = products.findIndex(p => p.id === id)  //Buscamos el índice donde se encuentra el elemento que queremos borrar, usando su id. 

    if (index === -1) {  //Si no existe tal elemento, el índice será '-1', por lo que mostramos un mensaje de Error 404.
        return res.status(404).json({ error: 'Product not found' })
    }


    const deletedProduct = products.splice(index, 1) //Sacamos del array el producto que queremos eliminar (Una sola posición a partir del índice) y devuelve un array con ese objeto eliminado.

    res.json({
        message: 'Product deleted',
        product: deletedProduct[0] //Enseñamos el producto eliminado, en el índice 0 (Solo hay uno)
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