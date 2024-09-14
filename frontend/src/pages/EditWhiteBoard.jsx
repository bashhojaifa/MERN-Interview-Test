import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Internal imports
import { getBoardById, updateBoard } from "../apiCalls/boardApi";
import {
  drawLine,
  drawRectangle,
  drawCircle,
  drawTriangle,
  drawText,
} from "../helpers/drawingHelpers";

const EditWhiteBoard = () => {
  const { id } = useParams(); // Get the board ID from the URL params
  const navigate = useNavigate(); // Use navigate to redirect after save

  const [drawingName, setDrawingName] = useState(""); // Store the name of the drawing
  const [isDrawing, setIsDrawing] = useState(false); // Flag to track if the user is drawing
  const [color, setColor] = useState("#3B3B3B"); // Color for drawing
  const [size, setSize] = useState("3"); // Line thickness
  const [drawMode, setDrawMode] = useState("pencil"); // Track the current drawing mode (pencil, line, etc.)
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 }); // Starting point of shapes or lines
  const [drawData, setDrawData] = useState([]); // Store drawing data (shapes, lines, text)
  const canvasRef = useRef(null); // Reference to the canvas element
  const ctx = useRef(null); // Reference to the canvas context
  const [currentShape, setCurrentShape] = useState(null); // Track the current shape being drawn

  // Load the board data by ID and initialize the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    ctx.current = canvas.getContext("2d");

    // Set the canvas size to fill the window
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    // Fetch board data and initialize the canvas with the drawing
    getBoardById(id).then((res) => {
      setDrawingName(res.name);
      const parsedData = Array.isArray(res.drawData)
        ? res.drawData
        : JSON.parse(res.drawData); // Parse the drawData if it's in string format
      setDrawData(parsedData);
      redrawCanvas(parsedData); // Redraw the canvas with the fetched data
    });
  }, [id]);

  // Redraw the canvas if drawData changes
  useEffect(() => {
    const canvas = canvasRef.current;
    ctx.current = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    if (drawData.length > 0) {
      redrawCanvas(drawData);
    }
  }, [drawData]);

  // Start drawing on mouse down
  const startDrawing = ({ nativeEvent }) => {
    setIsDrawing(true);
    setStartPosition({ x: nativeEvent.clientX, y: nativeEvent.clientY });

    // Begin the pencil drawing path
    if (drawMode === "pencil") {
      ctx.current.beginPath();
      ctx.current.moveTo(nativeEvent.clientX, nativeEvent.clientY);
      setCurrentShape({
        type: "pencil",
        points: [{ x: nativeEvent.clientX, y: nativeEvent.clientY }],
        color,
        size,
      });
    }
  };

  // Finish drawing when the mouse is released
  const finishDrawing = ({ nativeEvent }) => {
    if (!isDrawing) return;
    setIsDrawing(false);

    // Handle pencil drawing mode
    if (drawMode === "pencil" && currentShape && currentShape.points) {
      setDrawData((prevData) => [
        ...prevData,
        { type: "pencil", points: currentShape.points, color, size },
      ]);
      setCurrentShape(null); // Reset the current shape after saving
    } else {
      // Handle other shapes (line, rectangle, circle, etc.)
      const { clientX: endX, clientY: endY } = nativeEvent;
      const newShape = {
        type: drawMode,
        startX: startPosition.x,
        startY: startPosition.y,
        endX,
        endY,
        color,
        size,
        ...(drawMode === "text" && { text: prompt("Enter text:") || "" }), // Prompt for text if in text mode
      };
      setDrawData((prevData) => [...prevData, newShape]);
      redrawCanvas([...drawData, newShape]); // Redraw the canvas with the new shape
      setCurrentShape(null);
    }
  };

  // Draw on mouse move
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { clientX: currentX, clientY: currentY } = nativeEvent;
    const context = canvasRef.current.getContext("2d");

    if (drawMode === "pencil") {
      // Drawing for pencil mode
      context.lineWidth = size;
      context.lineCap = "round";
      context.strokeStyle = color;
      context.lineTo(currentX, currentY);
      context.stroke();
      // Update the current shape with the new points
      setCurrentShape((prevShape) => ({
        ...prevShape,
        points: prevShape?.points
          ? [...prevShape.points, { x: currentX, y: currentY }]
          : [{ x: currentX, y: currentY }],
      }));
    } else {
      // Handle shape drawing (line, rectangle, etc.)
      context.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      redrawCanvas(drawData); // Redraw previous shapes
      switch (drawMode) {
        case "line":
          drawLine(
            context,
            startPosition.x,
            startPosition.y,
            currentX,
            currentY
          );
          break;
        case "rectangle":
          drawRectangle(
            context,
            startPosition.x,
            startPosition.y,
            currentX,
            currentY
          );
          break;
        case "circle":
          drawCircle(
            context,
            startPosition.x,
            startPosition.y,
            currentX,
            currentY
          );
          break;
        case "triangle":
          drawTriangle(
            context,
            startPosition.x,
            startPosition.y,
            currentX,
            currentY
          );
          break;
        default:
          break;
      }
    }
  };

  // Redraw the canvas with the given data
  const redrawCanvas = (data) => {
    const context = canvasRef.current.getContext("2d");
    data.forEach((shape) => {
      const { type, startX, startY, endX, endY, color, size, text, points } =
        shape;
      context.strokeStyle = color;
      context.lineWidth = size;
      switch (type) {
        case "line":
          drawLine(context, startX, startY, endX, endY);
          break;
        case "rectangle":
          drawRectangle(context, startX, startY, endX, endY);
          break;
        case "circle":
          drawCircle(context, startX, startY, endX, endY);
          break;
        case "triangle":
          drawTriangle(context, startX, startY, endX, endY);
          break;
        case "text":
          drawText(context, text, endX, endY, color, size);
          break;
        case "pencil":
          if (points && points.length > 0) {
            context.beginPath();
            points.forEach((point, index) => {
              if (index === 0) {
                context.moveTo(point.x, point.y);
              } else {
                context.lineTo(point.x, point.y);
              }
            });
            context.stroke();
          }
          break;
        default:
          break;
      }
    });
  };

  // Clear the entire canvas
  const clearCanvas = () => {
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setDrawData([]);
  };

  // Submit the drawing data
  const handleSubmit = () => {
    if (drawingName.trim() === "") {
      alert("Please enter a name for the drawing"); // Validation for drawing name
      return;
    }
    updateBoard(id, { name: drawingName, drawData }).then((res) => {
      navigate("/", { state: { responseData: res.data } }); // Navigate to home page after saving
    });
  };

  return (
    <>
      {/* Toolbar buttons for drawing modes */}
      <div className="canvas-btn">
        <button onClick={() => setDrawMode("pencil")}>✏️ Pencil</button>
        <button onClick={() => setDrawMode("line")}>📏 Line</button>
        <button onClick={() => setDrawMode("rectangle")}>⬛ Rectangle</button>
        <button onClick={() => setDrawMode("circle")}>⚪ Circle</button>
        <button onClick={() => setDrawMode("triangle")}>🔺 Triangle</button>
        <button onClick={() => setDrawMode("text")}>🔤 Text</button>
        <button onClick={clearCanvas}>🗑️ Clear</button>
        {/* Input for color and size */}
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <input
          type="range"
          min="1"
          max="10"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
        {/* Input for drawing name */}
        <input
          type="text"
          placeholder="Enter drawing name"
          value={drawingName}
          onChange={(e) => setDrawingName(e.target.value)}
        />
        {/* Save button */}
        <button onClick={handleSubmit}>💾 Save</button>
      </div>
      {/* Canvas element to draw */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
      />
    </>
  );
};

export default EditWhiteBoard;
