const Category = require("../../models/category").model;

const create = async (name) => {
  //const data = {name};
  const category = new Category({ data });
  return await category.save();
};

module.exports = { create };
