const express = require('express') //Cargo la herramienta

const app = express() // Creo el backend/servidor con express. app = servidor
app.use(express.json())  // Middleware que pasa la petición a JS para poder trabajar con ella. 



//Datos en memoria (simulan una base de datos)
let products = ["libro", "lápiz", "regla"]
let nextId = 1


app.get('/health', (req, res) => {  //Si la url contiene la ruta /health, responde con OK
    res.json({ status: 'ok' })
})



app.get('/products', (req, res) => {
    res.json(products) // res.json serializa el array(lo convierte en json), pone el header corrector y cierra la respuesta
})


app.post('/products', (req, res) => {
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
})

module.exports = app