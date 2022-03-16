const app = require("./src/app");

const { databaseConfig, globalConfig } = require("./src/config");
const { Product } = require("./src/models");

databaseConfig.sync().then(result => {
  app.listen(globalConfig.port, async () => {
    console.log("Server running on port: " + globalConfig.port);
  });
});
