const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

// 
const MoviesController = require('../controllers/MovieController');

// 
router.get('/', MoviesController.getAllMovies)
router.post('/', login.required, MoviesController.insertMovie)
router.get('/:id_movie', MoviesController.getOneMovie)
router.patch('/:id_movie', login.required, MoviesController.updateMovie)
router.delete('/:id_movie', login.required, MoviesController.deleteMovie)


module.exports = router; 