const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

// 
const OrdersController = require('../controllers/OrdersControllers');

// 
router.get('/', OrdersController.getAllOrders)
router.post('/', login.required, OrdersController.insertOrder)
router.get('/:id_order', OrdersController.getOneOrder)
router.patch('/:id_order', login.required, OrdersController.updateOrder)
router.delete('/:id_order', login.required, OrdersController.deleteOrder)


module.exports = router; 