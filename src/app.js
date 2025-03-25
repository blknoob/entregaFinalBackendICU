const express = require("express");
const app = express();
const handlebarsConfig = require("./config/hbs");
const path = require("path");
const dotenv = require("dotenv");
const viewsRoutes = require("./routes/viewsRoutes");
const productsRoutes = require("./routes/productsRoutes");
const realTimeProductsRoutes = require("./routes/realTimeProductsRoutes");
const cartRoutes = require("./routes/cartRoutes");

dotenv.config();

handlebarsConfig(app);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", viewsRoutes);
app.use("/api", productsRoutes);
app.use("/api", realTimeProductsRoutes);
app.use("/api/carts", cartRoutes);

module.exports = app;
