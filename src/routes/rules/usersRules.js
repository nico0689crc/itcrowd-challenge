const { User } = require("../../models");

const getUserAuthenticationRules = body => {
  return [
    body("email")
      .isEmail()
      .withMessage("Formato de correo electronico es requerido."),
  ];
};

const postUserRules = body => {
  return [
    body("username")
      .isLength({ min: 6 })
      .withMessage("Debe tener al menos 6 caracteres."),
    body("email")
      .isEmail()
      .withMessage("Formato de correo electronico es requerido.")
      .custom(async value => {
        const user = await User.verifyExistingEmail(value);

        if (user) {
          return Promise.reject("Existing email");
        }
      })
      .withMessage(
        "Ya existe una cuenta registrada con esta dirección de correo electrónico."
      ),
    body("password")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener al menos 6 caracteres."),
  ];
};

module.exports = {
  postUserRules,
  getUserAuthenticationRules,
};
