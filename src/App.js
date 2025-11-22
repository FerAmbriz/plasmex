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
        <p>La solución profesional para biotecnológicas, CDMOs y laboratorios en México que necesitan calidad, documentación sólida y cero retrasos.</p> <button className="cta-btn">Solicitar Cotización en 24 horas</button>
      </header>

      <section className="section">
        <h1 style={{ color:'#40bd78ff', textAlign:'center', marginBottom:'0.3rem' }}>Nuestro compromiso</h1>
        <p style={{ color:'#000000ff', textAlign:'center', maxWidth:'800px', margin:'0 auto 0.3rem auto' }}>
          Producimos y purificamos plásmidos con documentación completa, pureza validada, control de endotoxina y trazabilidad 100% compatible con auditorías COFEPRIS, FDA y EMA.
        </p><p style={{ color:'#000000ff', textAlign:'center', maxWidth:'800px', margin:'0 auto 0.3rem auto' }}>
          Evita aduanas, retrasos y sobrecostos internacionales. Entregamos plásmidos listos para investigación o producción en 3 a 7 días.
        </p>
        <div className="card-container" id="cards-container"></div>
      </section>

      <section className="section">
        <h1 style={{ color:'#40bd78ff', textAlign:'center', marginBottom:'3rem' }}>Servicios Destacados</h1>
        <div className="servicios-destacados">
          <div className="servicio">
            <h3>Clonación de Plásmidos</h3>
            <p>Realizamos clonación eficiente y precisa de tus plásmidos, asegurando alta fidelidad y calidad en cada replicación para tus experimentos y proyectos.</p>
          </div>
          <div className="servicio">
            <h3>Soporte técnico real</h3>
            <p>Contamos con expertos en biología molecular que te guían en el diseño de plásmidos y estrategias de clonación, garantizando resultados confiables y reproducibles.</p>
          </div>
        </div><div className="servicio">
            <h3>Calidad industrial sin precios inflados
</h3>
            <p>Research Grade, High Quality y GMP-like según lo que necesites. Pureza asegurada, endotoxina baja y resultados reproducibles lote tras lote..</p>
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




