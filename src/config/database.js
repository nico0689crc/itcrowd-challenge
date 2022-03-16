const { Sequelize } = require("sequelize");
require("dotenv").config();

const config = {
  db_hostname: process.env.DB_HOSTNAME,
  db_name: process.env.DB_NAME,
  db_username: process.env.DB_USERNAME,
  db_password: process.env.DB_PASSWORD,
};

const sequelize = new Sequelize(
  config.db_name,
  config.db_username,
  config.db_password,
  {
    host: config.db_hostname,
    dialect: "mysql",
  }
);

module.exports = sequelize;
