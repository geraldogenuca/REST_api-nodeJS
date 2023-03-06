const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

require('dotenv').config();

// 
const UsersController = require('../controllers/UsersController');

// 
router.post('/register', UsersController.registerUser)
router.post('/login', UsersController.loginUser)

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM users;',
            (error, result, fields) => {
                if (error) {return res.status(500).send({error: error})}
                return res.status(200).send({response: result})
            }
        )                    
    });
});

module.exports = router;