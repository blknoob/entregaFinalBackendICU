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

  addProductCart: async (req, res) => {
    try {
      const { cartId, productId, quantity } = req.body;
      const cart = await cartManager.addProductToCart(
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
      const cart = await cartManager.deleteProductFromCart(cartId, productId);
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

  getCart: async (req, res) => {
    try {
      const { id } = req.params;
      const cart = await cartManager.getCartById(id);
      res.json(cart);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};

module.exports = CartController;
