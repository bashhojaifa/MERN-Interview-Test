export const drawLine = (context, x1, y1, x2, y2) => {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
};

export const drawRectangle = (context, x1, y1, x2, y2) => {
  context.beginPath();
  context.strokeRect(x1, y1, x2 - x1, y2 - y1);
};

export const drawCircle = (context, x1, y1, x2, y2) => {
  const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  context.beginPath();
  context.arc(x1, y1, radius, 0, Math.PI * 2);
  context.stroke();
};

export const drawTriangle = (context, x1, y1, x2, y2) => {
  const height = Math.abs(y2 - y1);
  context.beginPath();
  context.moveTo(x1, y1); // top point
  context.lineTo(x2, y2); // bottom-right point
  context.lineTo(x1 - (x2 - x1), y2); // bottom-left point
  context.closePath();
  context.stroke();
};

export const drawText = (context, text, x, y, color, size) => {
  context.fillStyle = color;
  context.font = `${size * 3}px Arial`;
  context.fillText(text, x, y);
};
