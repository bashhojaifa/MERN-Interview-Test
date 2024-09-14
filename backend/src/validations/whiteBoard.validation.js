const Joi = require("joi");

// Point validation schema
const pointSchema = Joi.object({
  x: Joi.number().required(),
  y: Joi.number().required(),
});

// DrawData validation schema
const drawDataSchema = Joi.object({
  type: Joi.string()
    .valid("pencil", "line", "rectangle", "circle", "triangle", "text")
    .required(),
  points: Joi.array()
    .items(pointSchema)
    .when("type", { is: "pencil", then: Joi.required() }),
  startX: Joi.number().when("type", {
    is: Joi.valid("line", "rectangle", "circle", "triangle", "text"),
    then: Joi.required(),
  }),
  startY: Joi.number().when("type", {
    is: Joi.valid("line", "rectangle", "circle", "triangle", "text"),
    then: Joi.required(),
  }),
  endX: Joi.number().when("type", {
    is: Joi.valid("line", "rectangle", "circle", "triangle", "text"),
    then: Joi.required(),
  }),
  endY: Joi.number().when("type", {
    is: Joi.valid("line", "rectangle", "circle", "triangle", "text"),
    then: Joi.required(),
  }),
  color: Joi.string().hex().required(),
  size: Joi.string().required(),
  text: Joi.string().when("type", { is: "text", then: Joi.required() }),
});

// Drawing validation schema
const drawingSchema = Joi.object({
  name: Joi.string().min(3).required(),
  drawData: Joi.array().items(drawDataSchema).required(),
});

module.exports = { drawingSchema };
