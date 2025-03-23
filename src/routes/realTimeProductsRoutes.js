const express = require("express");
const router = express.Router();
const realTimeProductsController = require("../controller/realTimeProductsController");

router.get("/realtimeproducts", realTimeProductsController.getRealTimeProducts);
router.post("/realtimeproducts", realTimeProductsController.createRealTimeProduct);
router.delete("/realtimeproducts:id", realTimeProductsController.deleteRealTimeProduct);

module.exports = router;
