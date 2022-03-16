const express = require("express");
const { body } = require("express-validator");
const { brandsRules } = require("./rules");
const { brandsServices } = require("../services");

const brandRoutes = express.Router();

brandRoutes.get("/", brandsServices.getBrands);

brandRoutes.get("/:brandId", brandsServices.getBrand);

brandRoutes.post(
  "/",
  brandsRules.postBrandRules(body),
  brandsServices.postBrand
);

brandRoutes.patch(
  "/:brandId",
  brandsRules.patchBrandRules(body),
  brandsServices.patchBrand
);

brandRoutes.delete("/:brandId", brandsServices.deleteBrand);

module.exports = brandRoutes;
