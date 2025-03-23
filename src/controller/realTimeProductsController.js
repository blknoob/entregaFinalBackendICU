const ProductManager = require("../manager/productManager");
const productManager = new ProductManager();

const realTimeProductsController = {
  getRealTimeProducts: async (req, res) => {
    try {
      const result = await productManager.getProducts();
      res.status(200).json({
        status: "success",
        payload: result,
      });
    } catch (error) {
      console.error("Error al obtener los productos", error.message);
      res.status(500).json({ message: "Error al obtener los productos" });
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
