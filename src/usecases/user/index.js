const User = require("../../models/users").model;

const getAll = async () => {
  return await User.find({}).exec();
};

const getById = async (id) => await User.findById(id).exec();

const create = async (name, password) => {
  const newUser = new User({ name, password });
  return await newUser.save();
};

const update = async (id, data) => {
  let { name, password } = data;

  if (!name || !password) {
    const user = await User.findById(id).exec();
    name = name ? name : user.name;
    password = password ? password : user.password;
  }

  return await User.findByIdAndUpdate(id, { name, password }).exec();
};

const del = async (id) => await User.findByIdAndDelete(id).exec();

module.exports = { getAll, getById, create, update, del };
