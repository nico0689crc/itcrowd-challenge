const postProductRules = body => {
  return [
    body("name")
      .isLength({ min: 10 })
      .withMessage(
        () => "El nombre del producto debe tener al menos 10 caracteres."
      ),
    body("description")
      .isLength({ min: 30 })
      .withMessage(
        () => "La descripción del producto debe tener al menos 30 caracteres."
      ),
    body("image_url")
      .not()
      .isEmpty()
      .trim()
      .withMessage(() => "El producto debe tener asignado una URL de imagen."),
    body("brand_id")
      .not()
      .isEmpty()
      .trim()
      .withMessage(() => "El producto debe tener asignado una marca."),
    body("price")
      .isDecimal({ decimal_digits: "0," })
      .withMessage(() => "El precio debe ser un número decimal."),
  ];
};

const patchProductRules = body => {
  return [
    body("name")
      .isLength({ min: 10 })
      .withMessage(
        () => "El nombre del producto debe tener al menos 10 caracteres."
      ),
    body("description")
      .isLength({ min: 30 })
      .withMessage(
        () => "La descripción del producto debe tener al menos 30 caracteres."
      ),
    body("image_url")
      .not()
      .isEmpty()
      .trim()
      .withMessage(() => "El producto debe tener asignado una URL de imagen."),
    body("brand_id")
      .not()
      .isEmpty()
      .trim()
      .withMessage(() => "El producto debe tener asignado una marca."),
    body("price")
      .isDecimal({ decimal_digits: "0," })
      .withMessage(() => "El precio debe ser un número decimal."),
  ];
};

module.exports = {
  postProductRules,
  patchProductRules,
};
