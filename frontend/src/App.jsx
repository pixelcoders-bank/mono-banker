import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Sala from "./pages/sala";
import Autenticacion from "./context/Autenticacion";
import Guardia from "./context/Guardia"
import JuegoCod from "./pages/juegocod"
import Movimiento from "./pages/movimiento";


const App = () => {
  return (
    <Router>
      <div className="App">
        <Autenticacion>
        <Routes>
          {/* Orden correcto: de más específico a más general */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Guardia />} >
          <Route path="/juegocod" element={<JuegoCod />} />
          <Route path="/movimientos" element={<Movimiento />}></Route>
          <Route path="/home" element={<Home />} />
          <Route path="/sala" element={<Sala />} />
          </Route>
        </Routes>
        </Autenticacion>
      </div>
    </Router>
  );
};

export default App;