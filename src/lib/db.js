const mongoose = require("mongoose");
const config = require("./config");

const connect = () => {
  return new Promise((resolve, reject) => {
    const { user, password, host } = config.db;

    mongoose.connect(
      `mongodb+srv://${user}:${password}@${host}/?retryWrites=true&w=majority`
    );

    const db = mongoose.connection;

    db.on("connected", () => {
      console.log("Connection successful :D");
      resolve(mongoose);
    });

    db.on("error", (error) => {
      console.error("Connection failed :c", error);
      reject(error);
    });
  });
};

module.exports = { connect };
