require("dotenv").config();

const globalConfig = {
  port: process.env.RUNNING_PORT,
};

module.exports = globalConfig;
