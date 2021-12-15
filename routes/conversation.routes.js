const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("./../middleware/jwt.middleware");
const Conversation = require("./../models/conversation.model");
const mongoose = require("mongoose");

//POST "/api/chat/conversation" Create new conversation

router.post("/api/chat/conversation", async (req, res, next) => {
  try {
    const newConversation = await Conversation.create({
      members: [req.body.senderId, req.body.receiverId],
    });
    res.status(200).json(newConversation);
  } catch (error) {
    next(error);
  }
});

//GET "/api/chat/conversation" get a conversation of a user
router.get(
  "/api/chat/conversation/:userId",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const foundConversation = await Conversation.find({
        members: { $in: [userId] },
      });
      res.status(200).json(foundConversation);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
