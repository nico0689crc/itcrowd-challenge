require("dotenv").config();

const globalConfig = {
  port: process.env.PORT,
  jwt_key: process.env.JWT_KEY,
  jwt_expiration_time: process.env.JWT_EXPIRATION_TIME,
};

module.exports = globalConfig;
