const ProductManager = require("../manager/productManager");
const productManager = new ProductManager();
const { Server } = require("socket.io");

const configureSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", async (socket) => {
    console.log("Cliente conectado");

    const products = await productManager.getProducts({});
    socket.emit("products", products.docs);

    socket.on("new-product", async (product) => {
      productManager.addProduct(
        product.title,
        product.description,
        product.code,
        product.price,
        product.stock,
        product.category,
        product.thumbnail
      );
      
      const products = await productManager.getProducts({});
      io.emit("products", products.docs);
    }
    );

    socket.on("delete-product", async (id) => {
      productManager.deleteProduct(id);
      const products = await productManager.getProducts({});
      io.emit("products", products.docs);
    });
  });
};

module.exports = configureSocket;
