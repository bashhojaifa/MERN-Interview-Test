const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");

// Internal imports
const { errorConverter, errorHandler } = require("./middleware/error");
const httpStatus = require("./constants/httpStatus");
const routes = require("./routers/whiteBoard.route");
const ApiError = require("./utils/ApiError");
const logRequest = require("./middleware/logRequest");

const app = express();

app.use(logRequest);

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// v1 api routes
app.use("/api/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
