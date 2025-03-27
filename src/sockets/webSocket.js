const { Server } = require("socket.io");
const Product = require("../models/products");

const configureSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", async (socket) => {
    console.log("Cliente conectado");

    socket.on("new-product", async (product) => {
      const newProduct = new Product(product);
      await newProduct.save();
      const products = await Product.find();
      io.emit("products", products);
    });

    socket.on("delete-product", async (id) => {
      await Product.findByIdAndDelete(id);
      const products = await Product.find();
      io.emit("products", products);
    });
  });
};

module.exports = configureSocket;
