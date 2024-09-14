const express = require("express");

const boardValidationSchema = require("../validations/whiteBoard.validation"); // Example schema import
const validate = require("../middleware/validate");
const {
  createBoard,
  getBoard,
  getBoards,
  updateBoard,
  deleteBoard,
} = require("../controllers/whiteBoard.controller");

// Create a new router
const router = express.Router();

// Define the routes
router
  .route("/board")
  .post(validate(boardValidationSchema), createBoard)
  .get(getBoards);

router
  .route("/board/:id")
  .get(getBoard)
  .patch(validate(boardValidationSchema), updateBoard)
  .delete(deleteBoard);

module.exports = router;
