const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  imageUrl: { type: String, required: true },
  favoriteGenres: [{ type: String, required: true }],
  booksSaleTrade: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  savedBooks: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

module.exports = model("User", userSchema);
