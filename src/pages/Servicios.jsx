import React from 'react';

export default function Servicios() {
  const servicios = [
    {
      img: "/produccion.png",
      title: "Producción y purificación de plásmidos",
      desc: "Plásmidos Research Grade, High Quality y GMP-like con endotoxina baja, pureza validada por electroforesis y documentación lista para auditorías COFEPRIS/EMA.",
      color: "#ffffffff" // Color de fondo de la sección
    },
    {
      img: "/diseno.png",
      title: "Diseño y optimización de plásmidos",
      desc: "Te ayudamos a estructurar mapas de plásmidos, ORFs, promotores, sistemas de selección y optimización para expresión estable o transitoria.",
      color: "#f5f7fa"
    },
    {
      img: "/clonacion.png",
      title: "Clonación y construcción genética",
      desc: "Servicios de clonación por enzimas, Gibson Assembly o Golden Gate, con verificación por secuenciación y reportes completos.",
      color: "#ffffffff"
    },
    {
      img: "/consultoria.png",
      title: "Consultoría en biología molecular",
      desc: "Acompañamiento técnico directo por expertos para resolver problemas de expresión, estabilidad de plásmidos o estrategias de escalamiento.",
      color: "#f5f7fa"
    }
  ];

  return (
    <div>
      {/* HERO */}
      <header className="hero">
        <h1>Servicios</h1>
        <p style={{ maxWidth: "800px", margin: "0.5rem auto", fontSize: "1.2rem" }}>
          Soluciones profesionales en producción, purificación y documentación de plásmidos,
          diseñadas para biotecnológicas, CDMOs y laboratorios que necesitan calidad real.
        </p>
      </header>

      {/* SECCIÓN DE SERVICIOS */}
      <section className="section">
        <h2 style={{ color:'#40bd78ff', textAlign:'center', marginBottom:'2rem' }}>
          ¿Qué ofrecemos?
        </h2>

        {servicios.map((servicio, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "2rem",
              backgroundColor: servicio.color, borderRadius: '15px', 
              flexDirection: index % 2 === 0 ? "row" : "row-reverse"
            }}
          >
            <img
              src={servicio.img}
              alt={servicio.title}
              style={{ width: "250px", height: "auto", margin: "0 2rem", borderRadius: '15px' }}
            />
            <div style={{ maxWidth: "600px" }}>
              <h3>{servicio.title}</h3>
              <p>{servicio.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* SECCIÓN EXTRA */}
      <section className="section">
        <h2 style={{ color:'#40bd78ff', textAlign:'center', marginBottom:'1rem' }}>
          ¿Por qué Plasmex?
        </h2>

        <p style={{
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto 1rem auto'
        }}>
          Eliminamos tiempos muertos, importaciones y retrasos. Nuestro enfoque está en
          calidad reproducible, comunicación clara y entrega rápida.
        </p>
      </section>
    </div>
  );
}