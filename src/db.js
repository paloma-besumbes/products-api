
//Pool es un gestor de conexiones a la base de datos (en Postgres)
//No es la conexión en sí, sino quien las administra. 
//Abre un número ilimitado de conexiones, las mantiene abiertas, las reutiliza entre repeticiones y evita abrir y cerrar constantemente (haría que el servicio fuera muy lento).
//Como una piscina de conexiones listas para usar. 
// 'pg' te ofrece: 1, Client (Gestión manual para cada request) y 2. Pool (Gestión profesional). En Backend real siempre usamos Pool. 

const { Pool } = require('pg')

const pool = new Pool({
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'thomashardy123',
    database: 'products_db'
})

module.exports = pool

//La conexión se abre cuando hacemos 'pool.query()', por ejemplo: pool.query('SELECT NOW()')
// En la API real no cerramos el pool, sino que vive durante toda la vida del servidor. Se cierra solo cuando el proceso termina. Cerrar el pool en cada request rompería todo. 

