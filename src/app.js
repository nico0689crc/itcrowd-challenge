const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { productsRoutes, brandsRoutes } = require("./routes");
const { unknownEndpoint, globalErrorHandler } = require("../src/middlewares");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/products", productsRoutes);
app.use("/api/brands", brandsRoutes);

app.use(unknownEndpoint);

app.use(globalErrorHandler);

module.exports = app;
