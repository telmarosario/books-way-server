const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const conversationSchema = new Schema(
  {
    members: { type: Array },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Conversation", conversationSchema);
