const { ErrorResponseParser, ResponsesTypes } = require("../shared");
const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const Brand = sequelize.define("brands", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: { type: Sequelize.STRING, allowNull: false },
  logo_url: { type: Sequelize.STRING, allowNull: false },
});

Brand.findAllCustom = async () => {
  return await Brand.findAll();
};

Brand.createCustom = async attribute => {
  return await Brand.create(attribute);
};

module.exports = Brand;
