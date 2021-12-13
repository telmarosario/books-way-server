const express = require("express");
const router = express.Router();
const Book = require("../models/book.model");
const User = require("../models/user.model");
const { isAuthenticated } = require("./../middleware/jwt.middleware");
const mongoose = require("mongoose");

// GET - 	/api/books Get all the books
router.get("/api/books", async (req, res, next) => {
  try {
    const allBooks = await Book.find(null, null, { sort: { createdAt: -1 } });
    res.status(200).json(allBooks);
  } catch (error) {
    res.status(500).json(error);
  }
});
// GET - /api/books/:bookId Get a specific book
router.get("/api/books/:bookId", isAuthenticated, async (req, res, next) => {
  try {
    const { bookId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      res.status(400).json({ message: "Invalid object id" });
      return;
    }

    const foundBook = await Book.findById(bookId).populate("userOwner");
    res.status(200).json(foundBook);
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST - /api/books Create a new book
router.post("/api/books", isAuthenticated, async (req, res, next) => {
  try {
    const { title, condition, saleOption, bookGenre, price, imageUrl } =
      req.body;
    const userOwner = req.payload._id;

    const createdBook = await Book.create({
      title,
      condition,
      tradeOrSale: saleOption,
      price,
      genre: bookGenre,
      imageUrl,
      userOwner,
    });

    await User.findByIdAndUpdate(userOwner, {
      $push: { booksSaleTrade: createdBook._id },
    });

    res.status(201).json(createdBook);
  } catch (error) {
    next(error);
  }
});

// PUT -  /api/books/:bookId Edit a book
router.put("/api/books/:bookId", isAuthenticated, async (req, res, next) => {
  try {
    const { bookId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      res.status(400).json({ message: "Invalid object id" });
      return;
    }

    const foundBook = await Book.findById(bookId);
    const { title, condition, saleOption, bookGenre, price, imageUrl } =
      req.body;
    const userOwner = req.payload._id;

    const updatedBook = await Book.findByIdAndUpdate(
      foundBook,
      {
        title,
        condition,
        tradeOrSale: saleOption,
        price,
        genre: bookGenre,
        imageUrl,
        userOwner,
      },
      { new: true }
    );
    res.status(200).json(updatedBook);
  } catch (error) {
    next(error);
  }
});

// DELETE - /api/books/:bookId Delete a book
router.delete("/api/books/:bookId", isAuthenticated, async (req, res, next) => {
  try {
    const { bookId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      res.status(400).json({ message: "Invalid object id" });
      return;
    }

    await Book.findByIdAndDelete(bookId);
    res.status(204).send(); // No Content
  } catch (error) {
    res.status(500).json(error);
  }
});
// POST - /api/books/:bookId Add specific book to favorites
router.post("/api/books/:bookId", isAuthenticated, async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const currentUser = req.payload._id;

    const foundBook = await Book.findById(bookId);
    const updatedSavedBooks = await User.findByIdAndUpdate(
      currentUser,
      {
        $push: { savedBooks: foundBook._id },
      },
      { new: true }
    );

    res.status(200).json(updatedSavedBooks);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
