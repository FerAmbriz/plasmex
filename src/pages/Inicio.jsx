import React from 'react';
import { useNavigate } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';

export default function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in relative">
      <ParticleBackground />

      {/* HERO SECTION */}
      <header className="hero">
        <img src="/logo.png" alt="Plasmex Logo" className="hero-logo" />
        <div className="typewriter-container">
          <h1 className="typewriter-text">Plasmex Biotech</h1>
        </div>

        <p className="hero-subtitle reveal-text delay-1">
          Innovación en ingeniería genética.
          <br />
          <span className="text-highlight">Plásmidos de pureza industrial</span> y trazabilidad certificada para potenciar tu investigación.
        </p>

        <button
          className="cta-btn reveal-text delay-2"
          onClick={() => navigate('/contacto')}
        >
          Iniciar Proyecto
        </button>
      </header>

      {/* VALUE PROPOSITION */}
      <section className="section">
        <h2 className="section-title reveal-text delay-3">
          Excelencia <span>Científica</span>
        </h2>

        <div className="card-container">
          <div className="spotlight-card reveal-text delay-1">
            <h3>Calidad Certificada</h3>
            <p>
              Estándares farmacéuticos en cada síntesis. Documentación exhaustiva
              y control de endotoxinas riguroso para resultados inquebrantables.
            </p>
          </div>

          <div className="spotlight-card reveal-text delay-2">
            <h3>Velocidad Crítica</h3>
            <p>
              Tu tiempo es valioso. Entregamos plásmidos listos para transfección
              en <strong>3 a 5 días hábiles</strong>, eliminando barreras logísticas.
            </p>
          </div>

          <div className="spotlight-card reveal-text delay-3">
            <h3>Asesoría Especializada</h3>
            <p>
              Más que proveedores, somos tus socios científicos. Soporte directo
              de doctores en biología molecular en cada etapa de tu proyecto.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}