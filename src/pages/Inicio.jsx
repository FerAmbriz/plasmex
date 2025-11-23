import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Inicio() {
  const navigate = useNavigate();

  return (
    <div>
      <header className="hero">
        <h1>Plasmex</h1>
        <img src="/plasmex.png" alt="Plasmex Logo" className="hero-img" />
        <p>Plásmidos de Alta Pureza y Trazabilidad Total, Entregados Rápido y con Estándares Industriales</p>
        <p>La solución profesional para biotecnológicas, CDMOs y laboratorios en México que necesitan calidad, documentación sólida y cero retrasos.</p>

        {/* BOTÓN REDIRIGIDO */}
        <button
          className="cta-btn"
          onClick={() => navigate('/contacto')}
        >
          Solicitar Cotización en 24 horas
        </button>
      </header>

      <section className="section">
        <h1 style={{ color:'#40bd78ff', textAlign:'center', marginBottom:'0.3rem' }}>Nuestro compromiso</h1>
        <p style={{ color:'#000', textAlign:'center', maxWidth:'800px', margin:'0 auto 0.3rem auto' }}>
          Producimos y purificamos plásmidos con documentación completa, pureza validada, control de endotoxina y trazabilidad 100% compatible con auditorías COFEPRIS, FDA y EMA.
        </p>
        <p style={{ color:'#000', textAlign:'center', maxWidth:'800px', margin:'0 auto 0.3rem auto' }}>
          Evita aduanas, retrasos y sobrecostos internacionales. Entregamos plásmidos listos para investigación o producción en 3 a 7 días.
        </p>
      </section>


      <section className="section">
        <h1 style={{ color:'#40bd78ff', textAlign:'center', marginBottom:'3rem' }}>Servicios Destacados</h1>
        <div className="servicios-destacados">
          <div className="servicio">
            <h3>Soporte técnico real</h3>
            <p>Contamos con expertos en biología molecular que te guían en el diseño de plásmidos y estrategias de clonación, garantizando resultados confiables y reproducibles.</p>
          </div>
          <div className="servicio">
            <h3>Calidad industrial sin precios inflados</h3>
            <p>Research Grade, High Quality y GMP-like según lo que necesites. Pureza asegurada, endotoxina baja y resultados reproducibles lote tras lote.</p>
          </div>
        </div>
      </section>
    </div>
  );
}