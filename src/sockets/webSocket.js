const ProductManager = require("../manager/productManager");
const productManager = new ProductManager();
const { Server } = require("socket.io");
const productsModels = require("../models/products");

const configureSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", async (socket) => {
    console.log("Cliente conectado");

    // const products = await productManager.getProducts({});
    // socket.emit("products", products);

    socket.on("new-product", async (product) => {
      const newProduct =await productManager.addProduct(
        product.title,
        product.description,
        product.code,
        product.price,
        product.stock,
        product.category,
        product.thumbnail
      );

      console.log("Resultado de new-product", newProduct);

      const total = await productsModels.countDocuments();
      console.log("Total de productos", total);


      const products = await productManager.getProducts({});
      io.emit("products", products.docs);
      console.log("Producto emitido");
    });

    socket.on("delete-product", async (id) => {
      await productManager.deleteProduct(id);
      const products = await productManager.getProducts({});
      io.emit("products", products.docs);
    });
  });
};

module.exports = configureSocket;
