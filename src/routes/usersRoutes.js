const express = require("express");
const { body } = require("express-validator");
const { userRules } = require("./rules");
const { usersServices } = require("../services");

const userRoutes = express.Router();

userRoutes.post(
  "/register",
  userRules.postUserRules(body),
  usersServices.registerUser
);

userRoutes.post(
  "/authenticate",
  userRules.getUserAuthenticationRules(body),
  usersServices.authenticateUser
);

module.exports = userRoutes;
