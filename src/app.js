const express = require('express');
const morgan = require('morgan');
const app = express();

// 
const moviesRoute = require('./routes/movies.route');
const usersRoute = require('./routes/users.route');
const ordersRoute = require('./routes/orders.route');

// 
app.use('/public', express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(morgan('dev'))

// 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next()
})

// 
app.use('/movies', moviesRoute)
app.use('/users', usersRoute)
app.use('/orders', ordersRoute)


// 
app.use((req, res, next) => {
    const error = new Error('Not found!');
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        error: {
            message: error.message
        }
    })
})

module.exports = app;