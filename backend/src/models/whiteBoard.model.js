const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Point schema
const pointSchema = new Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
});

// DrawData schema
const drawDataSchema = new Schema({
  type: { type: String, required: true },
  points: [pointSchema],
  startX: Number,
  startY: Number,
  endX: Number,
  endY: Number,
  color: { type: String, required: true },
  size: { type: String, required: true },
  text: String,
});

// Define the schema for the drawing
const drawingSchema = new Schema(
  {
    name: { type: String, required: true },
    drawData: { type: [drawDataSchema], required: true },
  },
  { timestamps: true }
);

const Drawing = mongoose.model("Drawing", drawingSchema);

module.exports = Drawing;
