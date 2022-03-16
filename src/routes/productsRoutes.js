const express = require("express");
const { body } = require("express-validator");
const { productsRules } = require("./rules");
const { productsServices } = require("../services");

const productRoutes = express.Router();

productRoutes.get("/", productsServices.getProducts);

productRoutes.get("/:productId", productsServices.getProduct);

productRoutes.post(
  "/",
  // productsRules.postProductRules(body),
  productsServices.postProduct
);

productRoutes.patch(
  "/:productId",
  // productsRules.patchProductRules(body),
  productsServices.patchProduct
);

productRoutes.delete("/:productId", productsServices.deleteProduct);

module.exports = productRoutes;
