const {
  TryCatchHelper,
  ExpressValidatorResult,
  ResponsesTypes,
} = require("../shared");
const { Brand } = require("../models");

const getBrands = async (req, res, next) => {
  TryCatchHelper(async () => {
    const brands = await Brand.findAllCustom();

    return res
      .status(
        ResponsesTypes.success.success_200.success_resource_get_success
          .httpStatusCode
      )
      .json({ data: brands });
  }, next);
};

const postBrand = async (req, res, next) => {
  TryCatchHelper(async () => {
    await ExpressValidatorResult(req);
    const attributes = req.body;

    const brand = await Brand.createCustom(attributes);

    return res
      .status(
        ResponsesTypes.success.success_200.success_resource_created_success
          .httpStatusCode
      )
      .json({ data: brand });
  }, next);
};

module.exports = {
  getBrands,
  postBrand,
};
