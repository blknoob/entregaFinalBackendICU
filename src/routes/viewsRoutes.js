const express = require("express");
const router = express.Router();

router.get("/api/products", (req, res) => {
  res.render("partials/products");
});

router.get("/api/realtimeproducts", (req, res) => {
  res.render("partials/realTimeProducts");
});

router.get("/api/carts", (req, res) => {
  res.render("partials/carts");
});

module.exports = router;
