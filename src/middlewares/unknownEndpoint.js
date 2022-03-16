const { ErrorResponseParser, ResponsesTypes } = require("../shared");

const unknownEndpoint = (req, res, next) => {
  const errorObject = [
    {
      source: {
        pointer: req.path,
      },
      title: "Ruta no encontrada.",
      detail: "No se pudo encontrar la ruta solicitada.",
    },
  ];

  return next(
    new ErrorResponseParser(
      ResponsesTypes.errors.errors_400.error_route_not_found,
      errorObject
    )
  );
};

module.exports = unknownEndpoint;
