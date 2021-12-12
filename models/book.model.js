const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    condition: { type: String, required: true },
    tradeOrSale: { type: String, enum: ["Trade", "Sale"], required: true },
    price: { type: Number },
    genre: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userOwner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Book", bookSchema);
