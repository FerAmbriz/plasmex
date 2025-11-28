import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

import Inicio from './pages/Inicio';
import Servicios from './pages/Servicios';
import Contacto from './pages/Contacto';

function App() {
  const appRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (appRef.current) {
        const cards = appRef.current.querySelectorAll('.spotlight-card');
        cards.forEach(card => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Router>
      <div ref={appRef}>
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

        <footer>© 2025 Plasmex Biotech</footer>
      </div>
    </Router>
  );
}

export default App;
