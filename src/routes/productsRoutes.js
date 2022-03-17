const express = require("express");
const { body } = require("express-validator");
const { productsRules } = require("./rules");
const { productsServices } = require("../services");
const { checkUserAuthorization } = require("../middlewares");

const productRoutes = express.Router();

productRoutes.get("/", productsServices.getProducts);

productRoutes.get("/:productId", productsServices.getProduct);

productRoutes.post(
  "/",
  checkUserAuthorization(),
  productsRules.postProductRules(body),
  productsServices.postProduct
);

productRoutes.patch(
  "/:productId",
  checkUserAuthorization(),
  productsRules.patchProductRules(body),
  productsServices.patchProduct
);

productRoutes.delete(
  "/:productId",
  checkUserAuthorization(),
  productsServices.deleteProduct
);

module.exports = productRoutes;
