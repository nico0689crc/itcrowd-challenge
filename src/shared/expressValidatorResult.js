const { validationResult } = require("express-validator");

const ErrorResponseParser = require("./errorResponseParser");
const ResponsesTypes = require("./responseTypes");

const expressValidatorResult = async req => {
  const errors = validationResult(req);

  const parseErrorObject = errors => {
    const errorsObjects = errors.errors.map(error => {
      return {
        source: {
          location: error.location,
          pointer: error.param,
        },
        title: "Atributo no válido",
        detail: error.msg,
      };
    });
    return errorsObjects;
  };

  if (!errors.isEmpty()) {
    throw new ErrorResponseParser(
      ResponsesTypes.errors.errors_400.error_input_validation,
      parseErrorObject(errors)
    );
  }
};

module.exports = expressValidatorResult;
