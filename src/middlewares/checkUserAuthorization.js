const { ResponsesTypes, ErrorResponseParser } = require("../shared");
const { globalConfig } = require("../config");
const { User } = require("../models");
const jwt = require("jsonwebtoken");

const stopRequestNoTokenProvided = next => {
  const errorsObjects = [
    {
      source: {
        pointer: "Token requerido.",
      },
      title: "Token requerido.",
      detail: "La solicitud se recibió sin el token requerido.",
    },
  ];

  return next(
    new ErrorResponseParser(
      ResponsesTypes.errors.errors_400.error_token_no_provided,
      errorsObjects
    )
  );
};

const stopRequestAuthotizationHeaderError = next => {
  const errorsObjects = [
    {
      source: {
        pointer: "Authorization Header sin Token.",
      },
      title: "Authorization Header sin Token.",
      detail:
        "La solicitud se recibió con un Authorization Header mal formado.",
    },
  ];

  return next(
    new ErrorResponseParser(
      ResponsesTypes.errors.errors_400.error_token_invalid,
      errorsObjects
    )
  );
};

const stopRequestNoValidToken = next => {
  const errorsObjects = [
    {
      source: {
        pointer: "Token invalido.",
      },
      title: "Token invalido.",
      detail: "La solicitud se recibió con un token invalido.",
    },
  ];

  return next(
    new ErrorResponseParser(
      ResponsesTypes.errors.errors_400.error_token_invalid,
      errorsObjects
    )
  );
};

const checkUserAuthorization = () => {
  return async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      stopRequestNoTokenProvided(next);
      return;
    }

    const token = authorizationHeader.split(" ")[1];

    if (!token) {
      stopRequestAuthotizationHeaderError(next);
      return;
    }

    const tokenDecodedPayload = await jwt.verify(
      token,
      globalConfig.jwt_key,
      function (error, decoded) {
        if (error) {
          return;
        }
        return decoded;
      }
    );

    if (!tokenDecodedPayload?.email) {
      stopRequestNoValidToken(next);
      return;
    }

    console.log(tokenDecodedPayload);

    const user = await User.findByPk(tokenDecodedPayload.email);

    if (!user) {
      stopRequestNoValidToken(next);
    }

    next();
  };
};

module.exports = checkUserAuthorization;
