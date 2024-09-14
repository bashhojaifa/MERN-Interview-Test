import axios from "axios";

// Base URL
const API_URL = "http://localhost:3000/api/v1";

// Create a new item
const createBoard = async (itemData) => {
  try {
    const response = await axios.post(`${API_URL}/board`, itemData);
    return response.data;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
};

// Get all items
const getAllBoards = async () => {
  try {
    const response = await axios.get(API_URL + "/board");
    return response.data;
  } catch (error) {
    console.error("Error getting all items:", error);
    throw error;
  }
};

// Get a single item by ID
const getBoardById = async (itemId) => {
  try {
    const response = await axios.get(`${API_URL}/board/${itemId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting item by ID:", error);
    throw error;
  }
};

// Update an existing item
const updateBoard = async (itemId, itemData) => {
  try {
    const response = await axios.patch(`${API_URL}/board/${itemId}`, itemData);
    return response.data;
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

// Delete an item by ID
const deleteBoard = async (itemId) => {
  try {
    const response = await axios.delete(`${API_URL}/board/${itemId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};

export { createBoard, getAllBoards, getBoardById, updateBoard, deleteBoard };
