const products = require('../models/products');


class ProductManager {
 
  async getProducts(query = {}) {
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
    
    return await products.paginate(prod, options);
  }

  async addProduct(title, description, code, price, stock, category, thumbnail) {
    if (!title || !description || !code || !price || !stock || !category || !thumbnail) {
      return { error: 'Faltan datos' };
    }
try {
    const newProduct = new products({
      title,
      description,
      code,
      price,
      status: true,
      stock,
      category,
      thumbnail
    });
    await newProduct.save();
    return newProduct;
  }
  catch (error) {
    return { error: 'Error al agregar producto' };
  }
  }

  async deleteProduct(id) {
    try {
      await products.findByIdAndDelete(id);
      return { message: 'Producto eliminado' };
    } catch (error) {
      return { error: 'Error al eliminar producto' };
    }
  }

  async getProductById(id) {
    try {
      return await products.findById(id);
    }
    catch (error) {
      return { error: 'Error al obtener producto' };
    }
  }

}
















module.exports = ProductManager;