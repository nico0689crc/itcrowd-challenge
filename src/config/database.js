require("dotenv").config();

const config = {};

const connect = callback => {
  //   mongoose
  //     .connect(getStringConnection(testing))
  //     .then(callback())
  //     .catch(error => {
  //       console.log("Error DB Connection ====>>> " + error.message);
  //     });
  callback();
};

const disconnect = () => {
  // mongoose.connection.close().catch(() => {
  //     console.log("Error DB Disconnection ====>>> " + error.message);
  //   });
};

const databaseConfig = {
  connect,
  disconnect,
};

module.exports = databaseConfig;
