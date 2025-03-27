const exphbs = require("express-handlebars");
const path = require("path");

function handlebarsConfig(app) {
  app.engine(
    "hbs",
    exphbs.engine({
      extname: ".hbs",
      defaultLayout: "main",
      partialsDir: path.join(__dirname, "..", "views", "partials"),
      runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
      },
      helpers: {
        multiply: (a, b) => a * b,
      },
    })
  );
  app.set("view engine", "hbs");
  app.set("views", path.join(__dirname, "..", "views"));
}

module.exports = handlebarsConfig;
