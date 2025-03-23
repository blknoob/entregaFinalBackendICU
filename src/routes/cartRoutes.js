const express = require('express');
const router = express.Router();
const CartController = require('../controller/cartController');

router.post('/carts', CartController.createCart);
router.post('/carts', CartController.addProductCart);
router.delete('/carts', CartController.deleteProductCart);
router.delete('/carts/:id', CartController.deleteCart);
router.get('/carts/:id', CartController.getCart);

module.exports = router;

