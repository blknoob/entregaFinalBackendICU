const express = require("express");
const router = express.Router();
const Cart = require("../models/carts");

router.get("/products", (req, res) => {
  res.render("partials/products");
});

router.get("/realtimeproducts", (req, res) => {
  res.render("partials/realTimeProducts");
});

router.get("/cart/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await Cart.findById(cid).populate("products.product");
    if (!cart) return res.status(404).send("Carrito no encontrado");

    let total = 0;
    cart.products.forEach(({ product, quantity }) => {
      total += product.price * quantity;
    });

    res.render("carts", {
      title: "Mi Carrito",
      cartId: cid,
      products: cart.products,
      total,
    });
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    res.status(500).send("Error interno del servidor");
  }
});

module.exports = router;
