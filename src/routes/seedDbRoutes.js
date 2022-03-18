const express = require("express");
const seedDbRoutes = express.Router();
const { User, Brand, Product } = require("../models");
const { databaseConfig } = require("../config");

const productsSeed = require("../utils/products.json");
const usersSeed = require("../utils/users.json");
const brandsSeed = require("../utils/brands.json");

seedDbRoutes.get("/", async (req, res, next) => {
  try {
    Product.belongsTo(Brand, { constraints: true, onDelete: "RESTRICT" });
    Brand.hasMany(Product);

    await databaseConfig.sync({ force: true });

    usersSeed.map(async user => {
      await User.registerUser(user);
    });

    const brandsCreatedId = (await Brand.bulkCreate(brandsSeed)).map(
      brand => brand.id
    );

    const productsParsed = productsSeed.map(product => {
      const randomIndex = Math.floor(Math.random() * brandsCreatedId.length);

      return {
        name: product.name,
        price: product.price,
        description: product.description,
        image_url: product.images[0].original,
        brandId: brandsCreatedId[randomIndex],
      };
    });

    await Product.bulkCreate(productsParsed);

    return res.send("Database populated.");
  } catch (error) {
    return res.send("Database error");
  }
});

module.exports = seedDbRoutes;
