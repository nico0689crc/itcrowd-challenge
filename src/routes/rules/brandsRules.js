const postBrandRules = body => {
  return [
    body("name")
      .not()
      .isEmpty()
      .trim()
      .withMessage("La marca debe tener asignada un nombre."),
    body("logo_url")
      .not()
      .isEmpty()
      .trim()
      .withMessage("La marca debe tener asignada una URL de imagen."),
  ];
};

module.exports = {
  postBrandRules,
};
