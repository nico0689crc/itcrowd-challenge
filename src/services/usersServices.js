const {
  TryCatchHelper,
  ExpressValidatorResult,
  ResponsesTypes,
} = require("../shared");
const { User } = require("../models");

const registerUser = (req, res, next) => {
  TryCatchHelper(async () => {
    await ExpressValidatorResult(req);
    const attributes = req.body;

    const user = await User.registerUser(attributes);

    return res
      .status(
        ResponsesTypes.success.success_200.success_resource_created_success
          .httpStatusCode
      )
      .json({ data: user });
  }, next);
};

const authenticateUser = (req, res, next) => {
  TryCatchHelper(async () => {
    await ExpressValidatorResult(req);
    const attributes = req.body;

    const user = await User.authenticateUser(attributes);

    return res
      .status(
        ResponsesTypes.success.success_200.success_user_authentication_success
          .httpStatusCode
      )
      .json({ data: user });
  }, next);
};

module.exports = {
  registerUser,
  authenticateUser,
};
