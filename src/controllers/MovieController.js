const mysql = require('../mysql');

// 
// 
exports.getAllMovies = async (req, res, next) => {
    try {
        // 
        const results = await mysql.execute('SELECT * FROM movies;')
        // 
        const response = {
            quantity: results.length,
            movies: results.map(mov => {
                return {
                    id_movie: mov.id_movie,
                    movie: mov.movie,
                    price: mov.price,
                    year: mov.year,
                    description: mov.description,
                    image: mov.image,
                    request: {
                        type: "GET",
                        description: 'Return movie list with details!',
                        url: 'localhost:4000/movies/' + mov.id_movie
                    }
                }
            })
        }
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({error: error})
    }
}

exports.insertMovie = async (req, res, next) => {
    try {
        // 
        const query =   `
                            INSERT  INTO
                                movies  (movie, price, year, description, image)
                                VALUES  (?,?,?,?,?);
                        `
        // 
        const result = await mysql.execute(
            query, 
            [
                req.body.movie, req.body.price,
                req.body.year, req.body.description, req.body.image
            ]
        )
        // 
        const response = {
            message: 'Movie inserted successfully!',
            createdMovie: {
                id_movie: result.insertId,
                movie: req.body.movie,
                price: req.body.price,
                year: req.body.year,
                description: req.body.description,
                image: req.body.image,
                request: {
                    type: "POST",
                    description: 'Movie inserted successfully!',
                    url: 'localhost:4000/movies/' + result.insertId
                }
            }
        }
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({error: error})
    }
}

exports.getOneMovie = async (req, res, next) => {
    try {
        // 
        const query = 'SELECT * FROM movies WHERE id_movie = ?;'
        // 
        const result = await mysql.execute(query, [req.params.id_movie])
    // 
    if(result.length == 0) {
        return res.status(404).send({
            message: 'ID movie not found!'
        })
    }
    // 
    const response = {
        movie: {
            id_movie: result[0].id_movie,
            movie: result[0].movie,
            price: result[0].movie,
            year: result[0].year,
            description: result[0].description,
            image: result[0].image,
            request: {
                type: 'GET',
                description: 'Returns specific movies!',
                url: 'localhost:4000/movies/' + result[0].id_movie 
            }
        }
    }
    return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({error: error})
    }
}

exports.updateMovie = async (req, res, next) => {
    try {
        // 
        const query =   `
                            UPDATE  movies
                            SET     movie = ?,
                                    price = ?,
                                    year = ?,
                                    description = ?,
                                    image = ?
                            WHERE   id_movie = ?;
                        `
        // 
        await mysql.execute(
            query,
            [
                req.body.movie, req.body.price,
                req.body.year, req.body.description, 
                req.body.image, req.params.id_movie
            ]
        )
        // 
        const response = {
            message: 'Movie updated successfully!',
            movieUpdate: {
                id_movie: req.body.id_movie,
                movie: req.body.movie,
                price: req.body.price,
                year: req.body.year,
                description: req.body.description,
                image: req.body.image
            }
        }
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({error: error})
    }
}

exports.deleteMovie = async (req, res, next) => {
    try {
        // 
        const query = 'DELETE FROM movies WHERE id_movie = ?;'
        // 
        await mysql.execute(query, [req.params.id_movie])
        // 
        const response = {
            message: 'Movie ID: ' + req.params.id_movie + ' deleted successfully!',
            request: {
                type: 'DELETE',
                description: 'Movie ID: ' + req.params.id_movie + ' deleted successfully!',
                url: 'URL disabled!'
            }
        }
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({error: error})
    } 
} 