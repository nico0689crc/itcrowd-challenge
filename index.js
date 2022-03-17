const app = require("./src/app");
const { Product, Brand } = require("./src/models");
const { databaseConfig, globalConfig } = require("./src/config");

Product.belongsTo(Brand, { constraints: true, onDelete: "RESTRICT" });
Brand.hasMany(Product);

databaseConfig.sync().then(() => {
  app.listen(globalConfig.port, async () => {
    console.log("Server running on port: " + globalConfig.port);
  });
});
