const CartManager = require("../manager/cartManager");
const cartManager = new CartManager();

const CartController = {

  createCart: async (req, res) => {
    try {
      const cart = await cartManager.createCart();
      res.status(201).json(cart);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getCarts: async (req, res) => {
    try {
      const carts = await cartManager.getCarts();
      res.json(carts);
    } catch (error) {
      res.status(400).json({ error });
    }
  },


  getCartById: async (req, res) => {
    try {
      const { id } = req.params;
      const cart = await cartManager.getCartById(id);
      res.json(cart);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  addProductCart: async (req, res) => {
    try {
      const { cartId, productId, quantity } = req.body;
      const cart = await cartManager.addProductCart(
        cartId,
        productId,
        quantity
      );
      res.json(cart);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  updateProductCart: async (req, res) => {
    try {
      const { cartId, productId, quantity } = req.body;
      const cart = await cartManager.updateProductCart(
        cartId,
        productId,
        quantity
      );
      res.json(cart);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  deleteProductCart: async (req, res) => {
    try {
      const { cartId, productId } = req.body;
      const cart = await cartManager.deleteProductCart(cartId, productId);
      res.json(cart);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  deleteCart: async (req, res) => {
    try {
      const { id } = req.params;
      const cart = await cartManager.deleteCart(id);
      res.json(cart);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  clearCart: async (req, res) => {
    try {
      const { id } = req.params;
      const cart = await cartManager.clearCart(id);
      res.json(cart);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  
};

module.exports = CartController;
