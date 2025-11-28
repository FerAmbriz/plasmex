import React from 'react';

export default function Servicios() {
  const steps = [
    {
      number: "01",
      title: "Diseño y Optimización",
      desc: "Todo comienza con el diseño perfecto. Estructuramos mapas de plásmidos, ORFs, promotores y sistemas de selección optimizados para una expresión estable o transitoria en tu sistema de interés."
    },
    {
      number: "02",
      title: "Clonación Genética",
      desc: "Materializamos el diseño. Utilizamos técnicas avanzadas como Gibson Assembly o Golden Gate, verificando cada construcción mediante secuenciación para garantizar precisión absoluta."
    },
    {
      number: "03",
      title: "Producción y Purificación",
      desc: "Escalamos tu proyecto. Producimos plásmidos Research Grade, High Quality o GMP-like con pureza validada y niveles de endotoxina controlados, listos para su aplicación."
    },
    {
      number: "04",
      title: "Integración Industrial",
      desc: "Llevamos tu desarrollo al siguiente nivel. Ofrecemos consultoría para la integración de estos plásmidos en entornos industriales escalables, asegurando reproducibilidad lote tras lote."
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* HERO */}
      <header className="hero" style={{ minHeight: '50vh' }}>
        <h1 className="section-title" style={{ marginBottom: '1rem' }}>
          De la Idea a la <span>Escala Industrial</span>
        </h1>
        <p className="hero-subtitle animate-slide-up delay-1">
          Soluciones integrales en ingeniería genética para biotecnológicas que exigen calidad, rapidez y escalabilidad.
        </p>
      </header>

      {/* STORYTELLING SECTION */}
      <section className="section">
        <div className="story-container">
          {steps.map((step, index) => (
            <div key={index} className={`story-step animate-slide-up delay-${(index % 3) + 1}`}>
              <div className="story-content">
                <div className="story-number">{step.number}</div>
                <h3 className="story-title">{step.title}</h3>
                <p>{step.desc}</p>
              </div>
              {/* Placeholder for visual balance or future abstract graphic */}
              <div className="story-content" style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'var(--bg-soft)',
                  border: '1px solid rgba(14, 165, 233, 0.1)'
                }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section" style={{ textAlign: 'center' }}>
        <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '2rem' }}>
          ¿Por qué elegir <span>Plasmex</span>?
        </h2>
        <p style={{ maxWidth: '800px', margin: '0 auto 3rem auto', fontSize: '1.1rem' }}>
          Eliminamos la incertidumbre de las importaciones y los tiempos muertos.
          Nuestro enfoque se centra en la calidad reproducible, la comunicación transparente y la entrega rápida.
        </p>
      </section>
    </div>
  );
}