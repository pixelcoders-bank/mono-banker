import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Sala from "./pages/sala";




const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Orden correcto: de más específico a más general */}
       
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sala" element={<Sala />} />
         
        </Routes>
        
   
      </div>
    </Router>
  );
};

export default App;