const express = require("express");
const router = express.Router();
const Cart = require("../models/carts");

const ProductManager = require("../manager/productManager");
const productManager = new ProductManager();

router.get("/products", (req, res) => {
  res.render("partials/products");
});

router.get("/realtimeproducts", (req, res) => {
  res.render("partials/realTimeProducts");
});

router.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productManager.getProductById(pid);
    if (!product) return res.status(404).send("Producto no encontrado");

    res.render("partials/details", {
      title: "Detalle del Producto",
      product,
    });
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/carts/:cid", async (req, res) => {
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
