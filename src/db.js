
//Pool es un gestor de conexiones a la base de datos (en Postgres)
//No es la conexión en sí, sino quien las administra. 
//Abre un número ilimitado de conexiones, las mantiene abiertas, las reutiliza entre repeticiones y evita abrir y cerrar constantemente (haría que el servicio fuera muy lento).
//Como una piscina de conexiones listas para usar. 
// 'pg' te ofrece: 1, Client (Gestión manual para cada request) y 2. Pool (Gestión profesional). En Backend real siempre usamos Pool. 



const { Pool } = require('pg')

const pool = new Pool({ //Aquí le decimos a qué BD vamos a conectar y con qué credenciales. No se abre aún la conexión, solo se configura el Pool. 
    host: 'localhost',
    user: 'postgres',
    password: '231311',
    database: 'products_db',
    port: 5432
})

module.exports = pool

//La conexión se abre cuando hacemos 'pool.query()', por ejemplo: pool.query('SELECT NOW()')
// En la API real no cerramos el pool, sino que vive durante toda la vida del servidor. Se cierra solo cuando el proceso termina. Cerrar el pool en cada request rompería todo. 

