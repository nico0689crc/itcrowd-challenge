const {
  TryCatchHelper,
  ExpressValidatorResult,
  ResponsesTypes,
} = require("../shared");
const { Product } = require("../models");

const getProducts = async (req, res, next) => {
  TryCatchHelper(async () => {
    const products = await Product.findAllCustom();

    return res
      .status(
        ResponsesTypes.success.success_200.success_resource_get_success
          .httpStatusCode
      )
      .json({ data: products });
  }, next);
};

const getProduct = async (req, res, next) => {
  TryCatchHelper(async () => {
    const { productId } = req.params;

    const product = await Product.findByPkCustom(productId);

    return res
      .status(
        ResponsesTypes.success.success_200.success_resource_get_success
          .httpStatusCode
      )
      .json({ data: product });
  }, next);
};

const postProduct = (req, res, next) => {
  TryCatchHelper(async () => {
    await ExpressValidatorResult(req);
    const attributes = req.body;

    const product = await Product.createCustom(attributes);

    return res
      .status(
        ResponsesTypes.success.success_200.success_resource_created_success
          .httpStatusCode
      )
      .json({ data: product });
  }, next);
};

const patchProduct = async (req, res, next) => {
  TryCatchHelper(async () => {
    await ExpressValidatorResult(req);
    const attributes = req.body;
    const { productId } = req.params;

    const product = await Product.patchCustom(productId, attributes);

    return res
      .status(
        ResponsesTypes.success.success_200.success_resource_updated_success
          .httpStatusCode
      )
      .json({ data: product });
  }, next);
};

const deleteProduct = async (req, res, next) => {
  TryCatchHelper(async () => {
    const { productId } = req.params;

    await Product.deleteCustom(productId);

    return res
      .status(
        ResponsesTypes.success.success_200.success_resource_deleted_success
          .httpStatusCode
      )
      .json({});
  }, next);
};

module.exports = {
  getProducts,
  getProduct,
  postProduct,
  patchProduct,
  deleteProduct,
};
