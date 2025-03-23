const express = require('express');
const router = express.Router();

router.get("/products", (req, res) => {
  res.render("partials/home");
});

router.get("/realtimeproducts", (req, res) => {
  res.render("partials/realTimeProducts");
});

router.get("/cart", (req, res) => {
  res.render("partials/carts");
});

module.exports = router;




