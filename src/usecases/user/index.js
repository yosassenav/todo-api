const User = require("../../models/users").model;

const create = async (name, password) => {
  const newUser = new User({ name, password });
  return await newUser.save();
};

module.exports = { create };
