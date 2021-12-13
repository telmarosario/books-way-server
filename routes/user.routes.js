const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const { isAuthenticated } = require("./../middleware/jwt.middleware");
const mongoose = require("mongoose");

// GET /api/users/current  - Get current user info
router.get("/api/users/current", isAuthenticated, async (req, res, next) => {
  try {
    // If the user is authenticated we can access the JWT payload via req.payload
    // req.payload holds the user info that was encoded in JWT during login.

    const currentUser = req.payload;
    const user = await User.findById(currentUser._id).populate(
      "booksSaleTrade"
    );

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// PUT /api/users/current  - Update the current user
router.put("/api/users/current", isAuthenticated, async (req, res, next) => {
  try {
    // If the user is authenticated we can access the JWT payload via req.payload
    // req.payload holds the user info that was encoded in JWT during login.

    const currentUser = req.payload;
    const { email, username, imageUrl, favoriteGenres } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      { email, username, imageUrl, favoriteGenres },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// GET api/user/current/saved - Get current user saved books

router.get(
  "/api/users/current/saved",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const currentUser = req.payload;
      const user = await User.findById(currentUser._id).populate({
        path: "savedBooks",
        model: "Book",
        populate: {
          path: "userOwner",
          model: "User",
        },
      });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

// GET /api/user/:userId - Get other users' profiles
router.get("/api/user/:userId", isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: "Invalid object id" });
      return;
    }

    const oneUser = await User.findById(userId).populate("booksSaleTrade");

    res.status(200).json(oneUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
