const mysql = require('../mysql');

// 
// 
exports.getAllOrders = async (req, res, next) => {
    try {
        // 
        const results = await mysql.execute('SELECT * FROM orders;')
        // 
        const response = {
            quantity: results.length,
            movies: results.map(ord => {
                return {
                    id_order: ord.id_order,
                    id_user: ord.id_user,
                    id_movie: ord.id_movie,
                    quantity: ord.quantity,
                    request: {
                        type: "GET",
                        description: 'Return orders list with details!',
                        url: 'localhost:4000/orders/' + ord.id_order
                    }
                }
            })
        }
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({error: error})
    }
}

exports.insertOrder = async (req, res, next) => {
    try {
        // 
        const query =   `
                            INSERT  INTO
                                orders  (id_user, id_movie, quantity)
                                VALUES  (?,?,?);
                        `
        // 
        const result = await mysql.execute(
            query, [req.body.id_user, req.body.id_movie, req.body.quantity]
        )
        // 
        const response = {
            message: 'Order inserted successfully!',
            createdOrder: {
                id_order: result.insertId,
                id_user: req.body.id_user,
                id_movie: req.body.id_movie,
                quantity: req.body.quantity,
                request: {
                    type: "POST",
                    description: 'Quantity inserted successfully!',
                    url: 'localhost:4000/orders/' + result.insertId
                }
            }
        }
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({error: error})
    }
}

exports.getOneOrder = async (req, res, next) => {
    try {
        // 
        const query = 'SELECT * FROM orders WHERE id_order = ?;'
        // 
        const result = await mysql.execute(query, [req.params.id_order])
    // 
    if(result.length == 0) {
        return res.status(404).send({
            message: 'ID order not found!'
        })
    }
    // 
    const response = {
        order: {
            id_order: result[0].id_movie,
            id_user: result[0].id_user,
            id_movie: result[0].id_movie,
            quantity: result[0].quantity,
            request: {
                type: 'GET',
                description: 'Returns specific order!',
                url: 'localhost:4000/orders/' + result[0].id_order
            }
        }
    }
    return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({error: error})
    }
}

exports.updateOrder = async (req, res, next) => {
    try {
        // 
        const query =   `
                            UPDATE  orders
                            SET     id_user = ?,
                                    id_movie = ?,
                                    quantity = ?
                            WHERE   id_order = ?;
                        `
        // 
        await mysql.execute(
            query, [req.body.id_user, req.body.id_movie, req.body.quantity, req.body.id_order]
        )
        // 
        const response = {
            message: 'Movie updated successfully!',
            movieUpdate: {
                id_order: req.body.id_order,
                id_user: req.body.id_user,
                id_movie: req.body.id_movie,
                quantity: req.body.quantity,
                request: {
                    type: 'PATCH',
                    description: 'Order updated successfully!',
                    url: 'localhost:4000/orders/' + req.body.id_order
                }
            }
        }
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({error: error})
    }
}

exports.deleteOrder = async (req, res, next) => {
    try {
        // 
        const query = 'DELETE FROM orders WHERE id_order = ?;'
        // 
        await mysql.execute(query, [req.params.id_order])
        // 
        const response = {
            message: 'Order ID: ' + req.params.id_order + ' deleted successfully!',
            request: {
                type: 'DELETE',
                description: 'Order ID: ' + req.params.id_order + ' deleted successfully!',
                url: 'URL disabled!'
            }
        }
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({error: error})
    } 
} 