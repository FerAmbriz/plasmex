import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

import Inicio from './pages/Inicio';
import Servicios from './pages/Servicios';
import Contacto from './pages/Contacto';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "nav-btn active" : "nav-btn"}
          >
            Inicio
          </NavLink>

          <NavLink 
            to="/servicios" 
            className={({ isActive }) => isActive ? "nav-btn active" : "nav-btn"}
          >
            Servicios
          </NavLink>

          <NavLink 
            to="/contacto" 
            className={({ isActive }) => isActive ? "nav-btn active" : "nav-btn"}
          >
            Contacto
          </NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>

        <footer>© 2025 Plasmex</footer>
      </div>
    </Router>
  );
}

export default App;
