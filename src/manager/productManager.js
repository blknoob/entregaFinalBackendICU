const productsModels = require("../models/products");

class ProductManager {
  async getProducts(query = {}) {
    console.log("query");
    const { category, search, page = 1, limit = 10 } = query;

    const prod = {};
    if (category) {
      prod.category = category;
    }

    if (search) {
      const searchRegex = new RegExp(search, "i");
      prod.$or = [{ title: searchRegex }];
    }

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { price: 1 },
    };

    const result = await productsModels.paginate(prod, options);
    if (result.docs.length === 0) {
      console.log("No se encontraron productos");
    } else {
      console.log("Productos encontrados");
    }

    return result;
  }

  async addProduct(
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnail
  ) {
    if (
      !title ||
      !description ||
      !code ||
      !price ||
      !stock ||
      !category ||
      !thumbnail
    ) {
      return { error: "Faltan datos" };
    }
    try {
      const newProduct = new productsModels({
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
        thumbnail,
      });

      const result = await newProduct.save();
      console.log("Producto agregado en la base de datos");
      return result;
    } catch (error) {
      console.error(
        "Error al agregar producto en la base de datos:",
        error.message
      );
      return { error: "Error al agregar producto" };
    }
  }

  async deleteProduct(id) {
    try {
      await productsModels.findByIdAndDelete(id);
      return { message: "Producto eliminado" };
    } catch (error) {
      return { error: "Error al eliminar producto" };
    }
  }

  async getProductById(id) {
    try {
      return await productsModels.findById(id);
    } catch (error) {
      return { error: "Error al obtener producto" };
    }
  }
}

module.exports = ProductManager;
