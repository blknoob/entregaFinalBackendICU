const express = require("express");
const router = express.Router();

router.get("/products", (req, res) => {
  res.render("partials/products");
});

router.get("/realtimeproducts", (req, res) => {
  res.render("partials/realTimeProducts");
});

router.get("/cart/:id", async (req, res) => {
  const { id } = req.params;
  res.render("partials/cart", {
    title: `mi carrito `,
    id: id,
    products: carts.products,
    total: total,
  });

  let total = 0;
  carts.products.forEach((product) => {
    total += product.price * product.quantity;
  });





});

module.exports = router;
