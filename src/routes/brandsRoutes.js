const express = require("express");
const { body } = require("express-validator");
const { brandsRules } = require("./rules");
const { brandsServices } = require("../services");
const { checkUserAuthorization } = require("../middlewares");

const brandRoutes = express.Router();

brandRoutes.get("/", brandsServices.getBrands);

brandRoutes.post(
  "/",
  checkUserAuthorization(),
  brandsRules.postBrandRules(body),
  brandsServices.postBrand
);

module.exports = brandRoutes;
