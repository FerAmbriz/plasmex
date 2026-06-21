import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

import Inicio from './pages/Inicio';
import Servicios from './pages/Servicios';
import Contacto from './pages/Contacto';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const appRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (appRef.current) {
        // Maintain mouse-move coordinates for potential subtle card reactions
        const elements = appRef.current.querySelectorAll('.spotlight-card');
        elements.forEach(el => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          el.style.setProperty('--mouse-x', `${x}px`);
          el.style.setProperty('--mouse-y', `${y}px`);
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="app-container" ref={appRef}>
        
        {/* Full-Width Corporate Navbar */}
        <nav className="navbar">
          <div className="navbar-container">
            <NavLink to="/" className="nav-brand">
              <img src="/logo.svg" alt="Plasmex Biotech" className="nav-logo" />
              <span className="brand-text">PLASMEX BIOTECH</span>
            </NavLink>

            <div className="nav-links">
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
            </div>

            {/* Corporate CTA */}
            <NavLink to="/contacto" className="nav-cta">
              Iniciar Proyecto
            </NavLink>
          </div>
        </nav>

        {/* Main Content Area */}
        <main>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </main>

        {/* Corporate Footer */}
        <footer>
          <div className="footer-container">
            <p>© 2026 Plasmex Biotech S.A. de C.V. Todos los derechos reservados.</p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>Investigación, síntesis y escalamiento molecular certificado.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
