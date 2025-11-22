// App.js
import React, { useEffect } from 'react';
import './App.css';


function App() {
  useEffect(() => {
    // Aquí podrías agregar lógica para generar dinámicamente cards de productos o servicios con D3
  }, []);

  const handleNavigation = (path) => {
    window.location.href = window.location.origin + path;
  };

  return (
    <div>
      <nav className="navbar">
  <button 
    onClick={() => handleNavigation('/')} 
    className="nav-btn active"
  >
    Inicio
  </button>

  <button 
    onClick={() => handleNavigation('/productos')} 
    className="nav-btn"
  >
    Productos
  </button>

  <button 
    onClick={() => handleNavigation('/servicios')} 
    className="nav-btn"
  >
    Servicios
  </button>

  <button 
    onClick={() => handleNavigation('/contacto')} 
    className="nav-btn"
  >
    Contacto
  </button>
</nav>


      <header className="hero">
        <h1>Plasmex</h1>
        <p>Plásmidos de Alta Pureza y Trazabilidad Total, Entregados Rápido y con Estándares Industriales</p>
      </header>

      <section className="section">
        <h2 style={{ color:'#47D788', textAlign:'center', marginBottom:'1rem' }}>Nuestros Productos</h2>
        <p style={{ color:'#ccc', textAlign:'center', maxWidth:'800px', margin:'0 auto 2rem auto' }}>
          Descubre nuestra amplia gama de plásmidos y herramientas de clonación optimizadas para investigación y desarrollo biotecnológico.
        </p>
        <div className="card-container" id="cards-container"></div>
      </section>

      <section className="section">
        <h2 style={{ color:'#47D788', textAlign:'center', marginBottom:'3rem' }}>Servicios Destacados</h2>
        <div className="servicios-destacados">
          <div className="servicio">
            <h3>Clonación de Plásmidos</h3>
            <p>Realizamos clonación eficiente y precisa de tus plásmidos, asegurando alta fidelidad y calidad en cada replicación para tus experimentos y proyectos.</p>
          </div>
          <div className="servicio">
            <h3>Asesoría Científica</h3>
            <p>Contamos con expertos en biología molecular que te guían en el diseño de plásmidos y estrategias de clonación, garantizando resultados confiables y reproducibles.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 style={{ color:'#47D788', textAlign:'center', marginBottom:'3rem' }}>Quiénes Somos</h2>
        <div className="info-cards">
          <InfoCard 
            title="Innovación Biotecnológica"
            text="Implementamos técnicas avanzadas de clonación y manipulación genética para entregar soluciones confiables y de alta precisión."
            svg={
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#47D788" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L15 8H9L12 2Z"/>
                <path d="M12 22V12"/>
                <path d="M2 12H22"/>
              </svg>
            }
          />
          <InfoCard 
            title="Equipo Especializado"
            text="Biólogos moleculares, bioinformáticos y técnicos experimentados colaborando para garantizar resultados exactos y reproducibles en cada proyecto."
            svg={
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#47D788" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="7" r="4"/>
                <path d="M5.5 21h13a2 2 0 0 0-1.73-1h-9.54A2 2 0 0 0 5.5 21z"/>
              </svg>
            }
          />
          <InfoCard 
            title="Transparencia y Confianza"
            text="Brindamos reportes claros y protocolos estandarizados, garantizando integridad, seguridad y reproducibilidad en cada clonación."
            svg={
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#47D788" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            }
          />
        </div>
      </section>

      <section className="cta-section">
        <h2>Optimiza tu Investigación con Plasmex</h2>
        <p>Confía en nosotros para la clonación de plásmidos y potencia tus proyectos de biotecnología con resultados precisos y confiables.</p>
        <button className="cta-btn">Contáctanos</button>
      </section>

      <footer>© 2025 Plasmex. Todos los derechos reservados.</footer>
    </div>
  );
}

const InfoCard = ({ title, text, svg }) => (
  <div className="info-card">
    <div className="graphic">{svg}</div>
    <div className="text">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  </div>
);

export default App;




