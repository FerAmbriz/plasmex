import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      {/* HERO SECTION */}
      <header className="hero">
        <div className="typewriter-container">
          <h1 className="typewriter-text">Plasmex Biotech</h1>
        </div>

        <p className="hero-subtitle reveal-text delay-1">
          Plásmidos de alta pureza y trazabilidad total.
          <br />
          La solución definitiva para biotecnológicas y laboratorios en México.
        </p>

        <button
          className="cta-btn reveal-text delay-2"
          onClick={() => navigate('/contacto')}
        >
          Solicitar Cotización
        </button>
      </header>

      {/* VALUE PROPOSITION */}
      <section className="section">
        <h2 className="section-title reveal-text delay-3">
          Nuestro <span>Compromiso</span>
        </h2>

        <div className="card-container">
          <div className="spotlight-card reveal-text delay-1">
            <h3>Calidad Industrial</h3>
            <p>
              Producimos y purificamos plásmidos con documentación completa,
              pureza validada y control de endotoxina compatible con estándares internacionales.
            </p>
          </div>

          <div className="spotlight-card reveal-text delay-2">
            <h3>Rapidez y Eficiencia</h3>
            <p>
              Evita aduanas y retrasos. Entregamos plásmidos listos para
              investigación o producción en tiempos récord de 3 a 7 días.
            </p>
          </div>

          <div className="spotlight-card reveal-text delay-3">
            <h3>Soporte Experto</h3>
            <p>
              Acompañamiento técnico real por expertos en biología molecular
              para garantizar resultados confiables y reproducibles.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}