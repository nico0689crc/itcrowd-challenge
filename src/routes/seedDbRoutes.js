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

    const brandsCreatedId = [];
    brandsSeed.map(async brand => {
      const brandCreated = await Brand.createCustom(brand);
      brandsCreatedId.push(brandCreated.id);
    });

    productsSeed.map(async product => {
      const randomIndex = Math.random() * (brandsCreatedId.length - 1);

      await Product.createCustom({
        name: product.name,
        price: product.price,
        description: product.description,
        image_url: product.images[0].original,
        brand_id: brandsCreatedId[randomIndex],
      });
    });

    return res.send("Database populated.");
  } catch (error) {
    return res.send("Database error");
  }
});

module.exports = seedDbRoutes;
