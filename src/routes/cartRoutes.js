const express = require('express');
const router = express.Router();
const CartController = require('../controller/cartController');

router.post('/', CartController.createCart);
router.get('/', CartController.getCarts);
router.get('/:id', CartController.getCartById);
router.post('/product', CartController.addProductCart);
router.put('/product', CartController.updateProductCart);
router.delete('/product', CartController.deleteProductCart);
router.delete('/:id', CartController.deleteCart);
router.delete('/id/clear', CartController.clearCart);


module.exports = router;

