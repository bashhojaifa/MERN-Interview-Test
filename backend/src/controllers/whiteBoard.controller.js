const catchAsync = require("../utils/catchAsync");
const httpStatus = require("../constants/httpStatus");
const {
  create,
  getBoard,
  getBoards,
  updateBoard,
  deleteBoard,
} = require("../services/whiteBoard.service");

/**
 * create a board
 * @param {object} req
 * @param {object} res
 * @returns {Promise<object>}
 */
exports.createBoard = catchAsync(async (req, res) => {
  const data = await create(req.body);
  res.status(httpStatus.CREATED).json({
    message: "Board created successfully",
    data,
  });
});

/**
 * get a board by id
 * @param {object} req
 * @param {object} res
 * @returns {Promise<object>}
 */
exports.getBoard = catchAsync(async (req, res) => {
  const data = await getBoard(req.params.id);
  res.status(httpStatus.OK).send(data);
});

/**
 * get all boards
 * @param {object} req
 * @param {object} res
 * @returns {Promise<object>}
 */
exports.getBoards = catchAsync(async (req, res) => {
  const data = await getBoards();
  res.status(httpStatus.OK).send(data);
});

/**
 * update a board by id
 * @param {object} req
 * @param {object} res
 * @returns {Promise<object>}
 */
exports.updateBoard = catchAsync(async (req, res) => {
  const data = await updateBoard(req.params.id, req.body);
  res.status(httpStatus.OK).json({
    message: "Board updated successfully",
    data,
  });
});

/**
 * delete a board by id
 * @param {object} req
 * @param {object} res
 * @returns {Promise<object>}
 */
exports.deleteBoard = catchAsync(async (req, res) => {
  const data = await deleteBoard(req.params.id);
  res.status(httpStatus.OK).json({
    message: "Board deleted successfully",
    data,
  });
});
