import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Internal imports
import "./App.css";
import WhiteBoard from "./pages/WhiteBoard";
import AddWhiteBoard from "./pages/AddWhiteBoard";
import EditWhiteBoard from "./pages/EditWhiteBoard";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<WhiteBoard />} />
          <Route path="/add" element={<AddWhiteBoard />} />
          <Route path="/edit/:id" element={<EditWhiteBoard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
