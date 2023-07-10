const mongoose = require("mongoose");

const Auth = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
});

const AuthSchema = mongoose.model("Auth", Auth);

module.exports = AuthSchema;
