const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
});

const model = mongoose.model("Users", schema);

module.exports = { schema, model };
