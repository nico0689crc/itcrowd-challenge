const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  productsRoutes,
  brandsRoutes,
  usersRoutes,
  seedDbRoutes,
} = require("./routes");
const { unknownEndpoint, globalErrorHandler } = require("../src/middlewares");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(
  "/uploads/images/brands",
  express.static(path.join("uploads", "images", "brands"))
);

app.use("/api/products", productsRoutes);
app.use("/api/brands", brandsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/seedDb", seedDbRoutes);

app.use(unknownEndpoint);

app.use(globalErrorHandler);

module.exports = app;
