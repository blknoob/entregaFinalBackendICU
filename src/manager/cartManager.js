const Cart = require("../models/carts");
const Product = require("../models/products");

class CartManager {
  async createCart() {
    try {
      const newCart = new Cart({ products: [] });
      await newCart.save();
      console.log("Carrito creado:", newCart._id);
      return newCart;
    } catch (error) {
      return { error: "Error al crear carrito" };
    }
  }

  async getCarts() {
    try {
      return await Cart.find().populate("products.product");
    } catch (error) {
      return { error: "Error al obtener carritos" };
    }
  }

  async getCartById(id) {
    try {
      return await Cart.findById(id).populate("products.product");
    } catch (error) {
      return { error: "Error al obtener carrito" };
    }
  }

  async addProductCart(cartId, productId, quantity) {
    try {
      const cart = await Cart.findById(cartId);
      const product = await Product.findById(productId);
      if (!cart || !product) {
        return { error: "Carrito o producto no encontrado" };
      }
      const productInCart = cart.products.find((p) => p.product == productId);
      if (productInCart) {
        productInCart.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
      await cart.save();
      return cart;
    } catch (error) {
      return { error: "Error al agregar producto al carrito" };
    }
  }

  async updateProductCart(cartId, productId, quantity) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        return { error: "Carrito no encontrado" };
      }
      const productInCart = cart.products.find((p) => p.product == productId);
      if (productInCart) {
        productInCart.quantity = quantity;
      }
      await cart.save();
      return cart;
    } catch (error) {
      return { error: "Error al actualizar producto del carrito" };
    }
  }

  async deleteProductCart(cartId, productId) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        return { error: "Carrito no encontrado" };
      }
      cart.products = cart.products.filter((p) => p.product != productId);
      await cart.save();
      return cart;
    } catch (error) {
      return { error: "Error al eliminar producto del carrito" };
    }
  }

  async deleteCart(id) {
    try {
      await Cart.findByIdAndDelete(id);
      return { message: "Carrito eliminado" };
    } catch (error) {
      return { error: "Error al eliminar carrito" };
    }
  }

  async clearCart(id) {
    try {
      const cart = await Cart.findById(id);
      if (!cart) {
        return { error: "Carrito no encontrado" };
      }
      cart.products = [];
      await cart.save();
      return cart;
    } catch (error) {
      return { error: "Error al limpiar carrito" };
    }
  }
}
module.exports = CartManager;
