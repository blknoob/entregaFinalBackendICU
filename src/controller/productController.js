const ProductManager = require("../manager/productManager");
const productManager = new ProductManager();

const productController = {
  getProducts: async (req, res) => {
    try {
      const result = await productManager.getProducts(req.query);
      res.status(200).json({
        status: "success",
        payload: result.docs,
        totalPages: result.totalPages,
        currentPage: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
      });
    } catch (error) {
      console.error("Error al obtener los productos:", error.message);
      res.status(500).json({ message: "Error al obtener los productos" });
    }
  },

  getProductById: async (req, res) => {
    try {
      const result = await productManager.getProductById(req.params.id);
  
      if (!result) {
        return res.status(404).json({ status: "error", message: "Producto no encontrado" });
      }
  
      res.status(200).json({
        status: "success",
        payload: result,
      });
    } catch (error) {
      console.error("Error al obtener el producto:", error.message);
      res.status(500).json({ message: "Error al obtener el producto" });
    }
  }
  
};

module.exports = productController;
