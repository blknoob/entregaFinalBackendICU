const express = require("express");
const router = express.Router();
const CartController = require("../controller/cartController");

router.post("/", CartController.createCart);
router.get("/", CartController.getCarts);
router.get("/:cid", CartController.getCartById);
router.post("/:cid/products/:pid", CartController.addProductCart);
router.put("/:cid/products/:pid", CartController.updateProductCart);
router.delete("/:cid/products/:pid", CartController.deleteProductCart);
router.delete("/:cid", CartController.deleteCart);
router.delete("/:cid/clear", CartController.clearCart);

module.exports = router;
