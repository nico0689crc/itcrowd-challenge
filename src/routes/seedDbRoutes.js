const express = require("express");
const seedDbRoutes = express.Router();
const { User, Brand, Product } = require("../models");

const productsSeed = require("../utils/products.json");

const usersSeed = [
  {
    email: "user_1@user.com",
    password: "user123!@",
    username: "Usuario 1",
  },
  {
    email: "user_2@user.com",
    password: "user123!@",
    username: "Usuario 2",
  },
  {
    email: "user_3@user.com",
    password: "user123!@",
    username: "Usuario 3",
  },
];

const brandsSeed = [
  {
    name: "Adidas",
    logo_url:
      "https://itcrowd-challenge-backend.herokuapp.com/uploads/images/brands/adidas_logo.jpeg",
  },
  {
    name: "Barilla",
    logo_url:
      "https://itcrowd-challenge-backend.herokuapp.com/uploads/images/brands/barilla_logo.png",
  },
  {
    name: "Coca Cola",
    logo_url:
      "https://itcrowd-challenge-backend.herokuapp.com/uploads/images/brands/coca_cola_logo.png",
  },
  {
    name: "Ford",
    logo_url:
      "https://itcrowd-challenge-backend.herokuapp.com/uploads/images/brands/ford_logo.png",
  },
  {
    name: "Marolio",
    logo_url:
      "https://itcrowd-challenge-backend.herokuapp.com/uploads/images/brands/marolio_logo.png",
  },
  {
    name: "Matarazo",
    logo_url:
      "https://itcrowd-challenge-backend.herokuapp.com/uploads/images/brands/matarazo_logo.png",
  },
  {
    name: "Pringles",
    logo_url:
      "https://itcrowd-challenge-backend.herokuapp.com/uploads/images/brands/pringles_logo.jpeg",
  },
  {
    name: "Starbucks",
    logo_url:
      "https://itcrowd-challenge-backend.herokuapp.com/uploads/images/brands/starbucks_logo.png",
  },
];

seedDbRoutes.get("/", async (req, res, next) => {
  try {
    await Product.destroy({ truncate: true, restartIdentity: true });
    await Brand.destroy({ truncate: { cascade: true }, restartIdentity: true });
    await User.destroy({ truncate: { cascade: true } });

    usersSeed.map(async user => {
      await User.registerUser(user);
    });

    brandsSeed.map(async brand => {
      await Brand.createCustom(brand);
    });

    productsSeed.map(async product => {
      await Product.createCustom({
        name: product.name,
        price: product.price,
        description: product.description,
        image_url: product.images[0].original,
        brand_id: Math.random() * (8 - 1) + 1,
      });
    });

    return res.send("Database populated.");
  } catch (error) {
    res.send(error.messsage);
  }
});

module.exports = seedDbRoutes;
