const express = require('express')
const productsRoutes = require('./routes/products.routes')

const app = express() // Creo el backend/servidor con express. app = servidor

app.use(express.json()) //Le decimos a Express que entienda JSON en el body de las peticiones HTTP (Que lo convierta a JS para poder tratar a info). Sin esto, la API no sabe leer los datos que le envían. 
app.get('/health', (req, res) => { //health check = Una ruta simple para comprobar que el servidor está vivo y funcionando. Se deja en app.js porque es parte de la infraestructura global, no del negocio.
    res.json({ status: 'ok' })
})

// Usamos las rutas
app.use(productsRoutes)

module.exports = app

//App es la aplicación principal (Es como decir "Toda la web")
// Router es un subconjunto de rutas relacionadas entre sí (Como decir la sección "productos", "usuarios", etc.)