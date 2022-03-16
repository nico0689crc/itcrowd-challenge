const { ErrorResponseParser, ResponsesTypes } = require("../shared");
const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const throwErrorNotFoundResource = resourceId => {
  const errorObject = {
    source: {
      pointer: `Product ID: ${resourceId}`,
    },
    title: "Producto no encontrado.",
    detail: `No se pudo encontrar el producto de ID: ${resourceId}.`,
  };

  throw new ErrorResponseParser(
    ResponsesTypes.errors.errors_400.error_resource_not_found,
    errorObject
  );
};

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.TEXT, allowNull: false },
  image_url: { type: Sequelize.STRING, allowNull: false },
  brand_id: { type: Sequelize.INTEGER, allowNull: false },
  price: { type: Sequelize.DOUBLE, allowNull: false },
});

Product.findAllCustom = async () => {
  return await Product.findAll();
};

Product.findByPkCustom = async productId => {
  const product = await Product.findByPk(productId);

  if (!product) {
    throwErrorNotFoundResource(productId);
  }

  return product;
};

Product.createCustom = async attribute => {
  return await Product.create(attribute);
};

Product.patchCustom = async (productId, attribute) => {
  const { name, description, image_url, brand_id, price } = attribute;
  const product = await Product.findByPk(productId);

  if (!product) {
    throwErrorNotFoundResource(productId);
  }

  product.name = name;
  product.description = description;
  product.image_url = image_url;
  product.brand_id = brand_id;
  product.price = price;

  await product.save();

  return product;
};

Product.deleteCustom = async productId => {
  const product = await Product.findByPk(productId);

  if (!product) {
    throwErrorNotFoundResource(productId);
  }

  await product.destroy();
};

module.exports = Product;
