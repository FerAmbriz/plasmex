import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Inicio from './pages/Inicio';
import Productos from './pages/Productos';
import Servicios from './pages/Servicios';
import Contacto from './pages/Contacto';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link to="/" className="nav-btn">Inicio</Link>
          <Link to="/productos" className="nav-btn">Productos</Link>
          <Link to="/servicios" className="nav-btn">Servicios</Link>
          <Link to="/contacto" className="nav-btn">Contacto</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>

        <footer>© 2025 Plasmex. Todos los derechos reservados.</footer>
      </div>
    </Router>
  );
}

export default App;