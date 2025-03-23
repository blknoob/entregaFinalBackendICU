const http = require("http");
const app = require("./src/app");
const configureSocket = require("./src/sockets/webSocket");





const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
configureSocket(server);


const connectDB = require("./src/models/db");

connectDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});