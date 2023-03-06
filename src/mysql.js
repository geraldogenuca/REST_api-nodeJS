
const mysql = require('mysql2');

require('dotenv').config();

let pool = mysql.createPool({
    "connectionLimit": 500,
    "database": process.env.DB_NAME,
    "user": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT
})

exports.execute = (query, params=[]) => {
    return new Promise((resolve, reject) => {
        pool.query(query, params, (error, result, fields) => {
            if(error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

exports.pool = pool;