const express = require('express') //Cargo la herramienta
//Router() = Crea un mini servidor de rutas (Un router es un objeto donde puedes definir rutas(GET, POST, etc), igual que en app, pero de forma aislada y modular)
// Es un objeto que tiene métodos como get, post, put, etc, y funciona como app PERO sin arrancar el servidor. 
//Lo usamos para agrupar Endpoints

const router = express.Router()

const validateProduct = require('../middlewares/validateProduct')



const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
} = require('../controllers/products.controller')



//GET all products

router.get('/products', getAllProducts)



//GET products by id
router.get('/products/:id', getProductById)


//CREATE product

router.post('/products', validateProduct, createProduct)


// UPDATE product (PUT)

router.put('/products/:id', validateProduct, updateProduct)


//PARTIAL UPDATE product (PATCH)

router.patch('/products/:id', patchProduct)


//DELETE product

router.delete('/products/:id', deleteProduct)



module.exports = router
