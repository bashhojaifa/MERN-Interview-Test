const httpStatus = require("../constants/httpStatus");
const Board = require("../models/whiteBoard.model");
const ApiError = require("../utils/ApiError");

/**
 * Create a board
 * @param {object} data
 * @returns {Promise<object>}
 */
exports.create = async (data) => {
  console.log(data);
  const result = await Board.create(data);
  return result;
};

/**
 * Get a board by id
 * @param {string} id
 * @returns {Promise<object>}
 */
exports.getBoard = async (id) => {
  const data = await Board.findById(id);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, "Board not found");
  }
  return data;
};

/**
 * Get all boards
 * @returns {Promise<object>}
 */
exports.getBoards = async () => {
  return await Board.find();
};

/**
 * Update a board by id
 * @param {string} id
 * @param {object} data
 * @returns {Promise<object>}
 */
exports.updateBoard = async (id, data) => {
  return await Board.findByIdAndUpdate(id, data, { new: true });
};

/**
 * Delete a board by id
 * @param {string} id
 * @returns {Promise<object>}
 */
exports.deleteBoard = async (id) => {
  return await Board.findByIdAndDelete(id);
};
