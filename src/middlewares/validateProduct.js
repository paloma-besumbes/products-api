function validateProduct(req, res, next) { //Comprueba los datos. Si algo falle, responde y corta. Si todo va bien, next() pasa al controller. 

    const { name, price, quantity } = req.body

    if (typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: 'Invalid name' })
    }

    if (typeof price !== 'number' || price < 0) {
        return res.status(400).json({ error: 'Invalid price' })
    }

    if (typeof quantity !== 'number' || quantity < 0) {
        return res.status(400).json({ error: 'Invalid quantity' })
    }

    next()

}


module.exports = validateProduct