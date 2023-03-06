const mysql = require('../mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// 
// 
exports.registerUser = async (req, res, next) => {
    try {
            var query =  'SELECT * FROM users WHERE email = ?;'
            var result = await mysql.execute(query, [req.body.email])
            if(result.length > 0) {
                return res.status(409).send({message: 'User already registered!'})
            }
            // 
            const hash = await bcrypt.hashSync(req.body.password, 10)
            query = 'INSERT INTO users (email, password) VALUES (?,?);'
            const results = await mysql.execute(query, [ req.body.email, hash]);

            const response = {
                message: 'User created successfully!',
                userCreated: {
                    id_user: results.insertId,
                    email: req.body.email,
                    hash: hash,
                    password: req.body.password
                }
            }
        return res.status(201).send(response)
    } catch (error) {
        return res.status(500).send({error: error})
        
    }
}

exports.loginUser = async (req, res, next) => {
    try {
        // 
        const query = 'SELECT * FROM users WHERE email = ?;'
        let results = await mysql.execute(query, [req.body.email])
        
        if(results.length < 1) {
            return res.status(401).send({message: 'Authentication failed!'})
        }
        // 
        if (await bcrypt.compareSync(req.body.password, results[0].password)) {
            const token = jwt.sign({
                id_user: results[0].id_user,
                email: results[0].email
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1h"
            });
            return res.status(200).send({
                message: 'Authentication successfully!',
                token: token
            });
        }
        return res.status(401).send({ message: 'Authentication failed!' })
    } catch (error) {
        return res.status(500).send({ message: 'Authentication failed!' });
    }       
}