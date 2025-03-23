const express = require('express');
const router = express.Router();
const CartController = require('../controller/cartController');

router.post('/cart', CartController.createCart);
router.post('/cart', CartController.addProductCart);
router.delete('/cart', CartController.deleteProductCart);
router.delete('/cart/:id', CartController.deleteCart);
router.get('/cart/:id', CartController.getCart);

module.exports = router;

