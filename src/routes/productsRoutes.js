const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductById);

module.exports = router;
