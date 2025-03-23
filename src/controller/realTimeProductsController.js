const ProductManager = require("../manager/productManager");
const productManager = new ProductManager();

const realTimeProductsController = {
  getRealTimeProducts: async (req, res) => {
    try {
      const products = await productManager.getProducts(req.query);
      res.render("partials/realTimeProducts", { products });
    } catch (error) {
      res.status(400).send({ error: "Error al obtener productos" });
    }
  },
  createRealTimeProduct: async (req, res) => {
    const { title, description, code, price, stock, category, thumbnail } =
      req.body;

    if (
      !title ||
      !description ||
      !code ||
      !price ||
      !stock ||
      !category ||
      !thumbnail
    ) {
      return res.status(400).json({ error: "Faltan datos" });
    }
    const newProduct = await productManager.addProduct(
      title,
      description,
      code,
      Number(price),
      Number(stock),
      category,
      thumbnail
    );
    if (newProduct.error) {
      return res.status(400).json({ error: newProduct.error });
    }
    res.status(201).json({
      status: "success",
      payload: newProduct,
    });
  },

  deleteRealTimeProduct: async (req, res) => {
    const { id } = req.params;
    const result = await productManager.deleteProduct(id);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    res.status(200).json({
      status: "success",
      message: "Producto eliminado",
    });
  },
};

module.exports = realTimeProductsController;
