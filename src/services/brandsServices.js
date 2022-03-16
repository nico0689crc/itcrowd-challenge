const { validationResult } = require("express-validator");

const getBrands = async (req, res, next) => {
  res.send("Get Brands All.");
};

const getBrand = async (req, res, next) => {
  res.send("Get Brand By Id.");
};

const postBrand = async (req, res, next) => {
  res.send("Post Brands.");
};

const patchBrand = async (req, res, next) => {
  res.send("Patch Brands.");
};

const deleteBrand = async (req, res, next) => {
  res.send("Delete Brands.");
};

module.exports = {
  getBrands,
  getBrand,
  postBrand,
  patchBrand,
  deleteBrand,
};
