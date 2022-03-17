const { ErrorResponseParser, ResponsesTypes } = require("../shared");
const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { globalConfig } = require("../config");

const User = sequelize.define("users", {
  email: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  username: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false },
});

User.registerUser = async attributes => {
  const passwordHashed = await bcryptjs.hash(attributes.password, 12);

  const user = await User.create({
    ...attributes,
    password: passwordHashed,
  });

  const credentials = { email: user.email, username: user.username };
  const jwtKey = globalConfig.jwt_key;
  const expirationTime = { expiresIn: globalConfig.jwt_expiration_time };

  const token = jwt.sign(credentials, jwtKey, expirationTime);

  return {
    username: user.username,
    email: user.email,
    token: token,
  };
};

User.authenticateUser = async attributes => {
  const { email, password } = attributes;
  const user = await User.findByPk(email);

  if (!user) {
    const errorObject = {
      source: {
        pointer: `Usuario email: ${email}`,
      },
      title: "Usuario no encontrado.",
      detail: `No se pudo encontrar el usuario con email: ${email}.`,
    };

    throw new ErrorResponseParser(
      ResponsesTypes.errors.errors_400.error_authentication_credential_incorrect,
      errorObject
    );
  }

  const passwordIsValid = await bcryptjs.compare(password, user.password);

  if (!passwordIsValid) {
    const errorObject = {
      source: {
        pointer: `Contraseña incorrecta`,
      },
      title: "Contraseña incorrecta.",
      detail: `La contraseña proporcionada es incorrecta.`,
    };

    throw new ErrorResponseParser(
      ResponsesTypes.errors.errors_400.error_authentication_credential_incorrect,
      errorObject
    );
  }

  const credentials = { email: user.email, username: user.username };
  const jwtKey = globalConfig.jwt_key;
  const expirationTime = { expiresIn: globalConfig.jwt_expiration_time };

  const token = jwt.sign(credentials, jwtKey, expirationTime);

  return {
    username: user.username,
    email: user.email,
    token: token,
  };
};

User.verifyExistingEmail = async email => {
  return await User.findByPk(email);
};

module.exports = User;
