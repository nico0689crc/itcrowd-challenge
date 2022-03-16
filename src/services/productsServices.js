const { validationResult } = require("express-validator");

const getProducts = async (req, res, next) => {
  res.send("Get Products All.");
};

const getProduct = async (req, res, next) => {
  res.send("Get Product By Id.");
};

const postProduct = async (req, res, next) => {
  res.send("Post Products.");
};

const patchProduct = async (req, res, next) => {
  res.send("Patch Products.");
};

const deleteProduct = async (req, res, next) => {
  res.send("Delete Products.");
};

module.exports = {
  getProducts,
  getProduct,
  postProduct,
  patchProduct,
  deleteProduct,
};
