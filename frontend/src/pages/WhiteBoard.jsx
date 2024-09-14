import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// Internal imports
import { getAllBoards, deleteBoard } from "../apiCalls/boardApi";

const WhiteBoard = () => {
  const location = useLocation();

  // State to store the list of boards
  const [data, setData] = useState([]);

  // Handle any state passed via navigation (for example, when adding or updating data)
  useEffect(() => {
    if (location.state) {
      if (location.state.addData) {
        // Add new data to the existing list
        setData([...data, location.state.addData]);
      }
      if (location.state.updatedData) {
        // Update an existing item in the list if it has been edited
        setData(
          data.map((item) =>
            item._id === location.state.updatedData._id
              ? location.state.updatedData
              : item
          )
        );
      }
    }
  }, [location.state]);

  // Handle the deletion of a board item
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      // API call to delete the board, and update the state after deletion
      deleteBoard(id).then((res) => {
        setData(data.filter((item) => item._id !== res.data._id)); // Remove the deleted item from the list
      });
    }
  };

  // Fetch all boards data
  useEffect(() => {
    getAllBoards().then((items) => {
      setData(items); // Populate the state with the fetched data
    });
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h2 className="title">Total Data ({data.length})</h2>
        <button className="add-button">
          <Link to="/add" className="decoration-none">
            <span className="plus-icon">+</span> Add Item
          </Link>
        </button>
      </div>
      {/* Table to display the list of boards */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th className="th serial-column">Serial</th>
              <th className="th">Name</th>
              <th className="th action-column">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Map over the data array to display each item in the table */}
            {data.map((item, index) => (
              <tr key={index}>
                {/* Serial number column */}
                <td className="td serial-column">{index + 1}</td>
                {/* Name column */}
                <td className="td">{item.name}</td>
                {/* Actions column (Edit and Delete) */}
                <td className="td action-column">
                  {/* Link to navigate to the edit page for the selected item */}
                  <Link to={`/edit/${item._id}`}>
                    <button className="action-button">
                      <svg
                        className="icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                      <span className="sr-only">Edit</span>{" "}
                      {/* Hidden for accessibility */}
                    </button>
                  </Link>
                  {/* Button to delete the item */}
                  <button
                    className="action-button"
                    onClick={() => handleDelete(item._id)}
                  >
                    <svg
                      className="icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                    <span className="sr-only">Delete</span>{" "}
                    {/* Hidden for accessibility */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WhiteBoard;
