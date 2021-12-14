const express = require("express");
const router = express.Router();
const Message = require("./../models/message.model");

//    Add message
router.post("/api/chat/message", async (req, res, next) => {
  try {
    const newMessage = await Message.create(req.body);
    res.status(200).json(newMessage);
  } catch (error) {
    next(error);
  }
});

//GET    get all messages inside one conversation
router.get("/api/chat/message/:conversationId", async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const allMessages = await Message.find({
      conversationId: conversationId,
    });
    res.status(200).json(allMessages);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
