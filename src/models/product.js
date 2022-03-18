const { ErrorResponseParser, ResponsesTypes } = require("../shared");
const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");
const { globalConfig } = require("../config");
const Brand = require("./brand");

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

const getPaginationLinks = (totalItems, page) => {
  const links = {};
  const apiUrl = `${globalConfig.api_url}/products?`;
  const totalPages = Math.ceil(totalItems / +page.size);
  const currentPage = +page.number;

  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages && totalPages > 0) {
    currentPage = totalPages;
  }

  const firstPage = 1;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  if (currentPage === 2 && totalPages !== 0) {
    links.prev = `${apiUrl}page%5Bnumber%5D=${prevPage}&page%5Bsize%5D=${page.size}`;
  } else if (currentPage >= 3 && totalPages !== 0) {
    links.first = `${apiUrl}page%5Bnumber%5D=${firstPage}&page%5Bsize%5D=${page.size}`;
    links.prev = `${apiUrl}page%5Bnumber%5D=${prevPage}&page%5Bsize%5D=${page.size}`;
  }

  links.self = `${apiUrl}page%5Bnumber%5D=${currentPage}&page%5Bsize%5D=${page.size}`;

  if (currentPage <= totalPages - 2) {
    links.next = `${apiUrl}page%5Bnumber%5D=${nextPage}&page%5Bsize%5D=${page.size}`;
    links.last = `${apiUrl}page%5Bnumber%5D=${totalPages}&page%5Bsize%5D=${page.size}`;
  } else if (currentPage <= totalPages - 1) {
    links.next = `${apiUrl}page%5Bnumber%5D=${nextPage}&page%5Bsize%5D=${page.size}`;
  }

  return links;
};

const Product = sequelize.define("products", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.TEXT, allowNull: false },
  image_url: { type: Sequelize.STRING, allowNull: false },
  price: { type: Sequelize.DOUBLE, allowNull: false },
});

Product.findAllCustom = async (page = { number: 1, size: 10 }) => {
  const limit = +page.size;
  const offset = (page.number - 1) * page.size;

  const totalItems = await Product.count();

  const products = await Product.findAll({
    limit: limit,
    offset: offset,
    include: Brand,
  });

  const result = {
    api: {
      totalItems: totalItems,
    },
    links: getPaginationLinks(totalItems, page),
    data: products,
  };

  return result;
};

Product.findByPkCustom = async productId => {
  const product = await Product.findByPk(productId, { include: Brand });

  if (!product) {
    throwErrorNotFoundResource(productId);
  }

  return product;
};

Product.createCustom = async attribute => {
  return await Product.create({ ...attribute, brandId: attribute.brand_id });
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
