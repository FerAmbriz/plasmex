import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Servicios() {
  const navigate = useNavigate();

  const steps = [
    {
      number: "01",
      title: "Diseño y Optimización Molecular",
      desc: "Todo comienza con la arquitectura genética adecuada. Estructuramos mapas de plásmidos, seleccionamos y optimizamos ORFs (optimizando codones según el organismo huésped), promotores, terminadores y marcadores de selección para asegurar una expresión estable y de alto rendimiento en tu sistema de interés. Un buen diseño puede incrementar tu producción hasta un 1000%.",
      gradient: "blue-gradient",
      vectorTitle: "Arquitectura Genética",
      specs: ["Optimización de codones", "Diseño in silico de mapas", "Uso de tags y reporteros", "Predicción estructural"],
      deliverables: ["Archivo GenBank (.gb) optimizado", "Reporte de compatibilidad in silico", "Mapa anotado de plásmido"],
      actionLabel: "Configurar mi vector ahora 🧬",
      actionUrl: "/"
    },
    {
      number: "02",
      title: "Clonación y Ensamble de ADN",
      desc: "Materializamos tus diseños virtuales. Empleamos tecnologías de ensamblaje molecular avanzadas (como Gibson Assembly, Golden Gate y ligación tradicional) para integrar tus genes de interés en los vectores elegidos. Todo el proceso es verificado mediante secuenciación capilar Sanger para garantizar precisión del 100% libre de mutaciones.",
      gradient: "", // Standard corporate grey
      vectorTitle: "Precisión Molecular",
      specs: ["Ensamble de fragmentos", "Ligasas y restricción", "Secuenciación Sanger/NGS", "Validación de juntas"],
      deliverables: ["Secuenciación capilar completa", "Glicerol stock del clon validado", "Cromatograma de lectura (.ab1)"],
      actionLabel: "Iniciar clonación de gen 📥",
      actionUrl: "/contacto?servicio=Clonación"
    },
    {
      number: "03",
      title: "Producción a Escala y Purificación",
      desc: "Escalamos la producción a la medida de tu proyecto. Realizamos la propagación en biorreactores controlados y purificamos los plásmidos mediante columnas de intercambio aniónico, asegurando un porcentaje de ADN superenrollado excepcional y niveles de endotoxinas prácticamente indetectables mediante ensayo LAL cromogénico.",
      gradient: "blue-gradient",
      vectorTitle: "Suministro Biológico",
      specs: ["Rendimientos de µg a gramos", "Pureza >90% superenrollado", "Endotoxinas <0.05 EU/µg", "Cromatografía de columna"],
      deliverables: ["Plásmido purificado (Liofilizado)", "Certificado de análisis (COA)", "Ensayo LAL de endotoxinas"],
      actionLabel: "Solicitar producción a escala 🔬",
      actionUrl: "/contacto?servicio=Purificación"
    },
    {
      number: "04",
      title: "Integración Industrial y Consultoría",
      desc: "Llevamos tus desarrollos de laboratorio a una escala productiva real. Te asesoramos en el cumplimiento de normativas de bioseguridad, el diseño de bioprocesos reproducibles, la transferencia de tecnología y la optimización de lotes piloto para ensayos preclínicos preliminares.",
      gradient: "",
      vectorTitle: "Escalamiento Piloto",
      specs: ["Diseño de bioprocesos piloto", "Protocolos e insumos", "Estudios de estabilidad", "Cumplimiento normativo"],
      deliverables: ["Protocolo de escalamiento personalizado", "Análisis de costes operacionales", "Soporte regulatorio incluido"],
      actionLabel: "Agendar consultoría técnica 📞",
      actionUrl: "/contacto?servicio=Consultoría"
    }
  ];

  const handleActionClick = (url) => {
    if (url === "/") {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('constructor-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(url);
    }
  };

  return (
    <div className="animate-fade-in">

      {/* HERO SECTION */}
      <header className="hero" style={{ minHeight: '50vh' }}>
        <h1 className="hero-title">
          De la Idea a la <span>Escala Industrial</span>
        </h1>
        <p className="hero-subtitle animate-slide-up delay-1">
          Ofrecemos soluciones integrales y servicios punta a punta en ingeniería genética para empresas y laboratorios biotecnológicos que exigen la máxima pureza, trazabilidad y rapidez en el suministro.
        </p>
        <button
          className="cta-btn animate-slide-up delay-2"
          onClick={() => navigate('/contacto')}
        >
          Iniciar Cotización de Plásmidos
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </header>

      {/* PIPELINE SECTION */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">
            Nuestro Flujo de <span>Trabajo Biotecnológico</span>
          </h2>
          <p className="section-desc">
            Seguimos procesos estandarizados rigurosos en cada fase del desarrollo para asegurar que recibas plásmidos estables y listos para transfección sin contratiempos.
          </p>
        </div>

        <div className="pipeline-timeline">
          {steps.map((step, index) => (
            <div key={index} className="pipeline-step">

              {/* Timeline badge / number */}
              <div className="pipeline-badge">
                {step.number}
              </div>

              {/* Informative text & specifications */}
              <div className="pipeline-info">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                <div style={{ marginBottom: '1.25rem' }}>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.5rem', fontWeight: '700' }}>
                    Entregables incluidos:
                  </h4>
                  <ul style={{ listStyleType: 'none', paddingLeft: '0', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {step.deliverables.map((deliv, delIdx) => (
                      <li key={delIdx} style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--accent-emerald)', fontWeight: 'bold' }}>✓</span>
                        {deliv}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pipeline-specs">
                  {step.specs.map((spec, specIdx) => (
                    <span key={specIdx} className={`spec-item ${specIdx === 0 ? 'active' : ''}`}>
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Minimalist Corporate Vector Placeholder */}
              <div className="pipeline-visual">
                <div className="pipeline-visual-vector">
                  {index === 0 && (
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="var(--primary-teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="4.5" y1="16.5" x2="19.5" y2="7.5"></line>
                      <line x1="4.5" y1="7.5" x2="19.5" y2="16.5"></line>
                      <path d="M7.5 7.5a3 3 0 1 0 0 6 3 3 0 1 0 0-6zM16.5 10.5a3 3 0 1 0 0 6 3 3 0 1 0 0-6z"></path>
                    </svg>
                  )}
                  {index === 1 && (
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" strokeWidth="1.5">
                      <path d="M6 3h12v18H6zM10 8h4M10 12h4M10 16h2"></path>
                    </svg>
                  )}
                  {index === 2 && (
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="var(--primary-teal)" strokeWidth="1.5">
                      <path d="M12 2v20M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  )}
                  {index === 3 && (
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="var(--accent-indigo)" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 6v6l4 2"></path>
                    </svg>
                  )}
                  <span className="pipeline-vector-title">{step.vectorTitle}</span>
                  <span
                    className="pipeline-vector-action-link"
                    onClick={() => handleActionClick(step.actionUrl)}
                  >
                    {step.actionLabel}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON / QUALITY TIERS MATRIX */}
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="section-header">
          <h2 className="section-title">
            Grados de Pureza y <span>Especificaciones de Calidad</span>
          </h2>
          <p className="section-desc">
            Ajustamos los criterios de control analítico según el destino final de tus vectores moleculares para optimizar tu presupuesto científico.
          </p>
        </div>

        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Especificación Técnica</th>
                <th>Grado de Investigación (Research)</th>
                <th>Grado de Transfección (High Quality)</th>
                <th>Pre-clínico (GMP-like)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Porcentaje Superenrollado</strong></td>
                <td>&gt;85% (Verificado en Gel)</td>
                <td>&gt;90% (HPLC / Capilar)</td>
                <td>&gt;95% (HPLC Capilar validado)</td>
              </tr>
              <tr>
                <td><strong>Límite de Endotoxinas</strong></td>
                <td>No controlado (Típico &lt;0.1 EU/µg)</td>
                <td>&lt;0.05 EU/µg (LAL)</td>
                <td>&lt;0.01 EU/µg o Indetectable</td>
              </tr>
              <tr>
                <td><strong>Detección de ARN residual</strong></td>
                <td>Trazas leves permitidas</td>
                <td>Ausente (Fluorometría)</td>
                <td>Ausente (Método validado)</td>
              </tr>
              <tr>
                <td><strong>Trazas de Proteína/Genómico</strong></td>
                <td>No determinado</td>
                <td>&lt;1% residual (Qubit)</td>
                <td>&lt;0.5% (Cumplimiento de pureza)</td>
              </tr>
              <tr>
                <td><strong>Trazas de Disolventes/Sales</strong></td>
                <td>Trazas estándar</td>
                <td>Mínimas (Lavado exhaustivo)</td>
                <td>Límites validados de control</td>
              </tr>
              <tr>
                <td><strong>Trazabilidad y Control</strong></td>
                <td>Reporte básico Sanger</td>
                <td>Análisis COA, Sanger / NGS</td>
                <td>Trazabilidad completa de lote + Archivo COA y NGS completo</td>
              </tr>
              <tr>
                <td><strong>Aplicaciones Recomendadas</strong></td>
                <td>PCR, secuenciación, clonado, expresión en bacterias.</td>
                <td>Transfección en mamíferos, edición con CRISPR/Cas9, producción de virus (AAV/Lentivirus).</td>
                <td>Estudios de terapia génica preclínicos in vivo, prototipado de vacunas ADN.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="spotlight-card cta-spotlight-card">
          <h2 className="section-title" style={{ marginBottom: '1.5rem', fontSize: '2.2rem' }}>
            ¿Listo para <span>Acelerar tu Investigación</span>?
          </h2>
          <p style={{ maxWidth: '650px', margin: '0 auto 2.5rem auto', fontSize: '1.1rem', color: 'var(--text-muted)' }}>
            Evita retrasos logísticos y aduanas internacionales comprando directamente en México con soporte experto y documentación completa.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="cta-btn" onClick={() => navigate('/contacto')}>
              Solicitar Presupuesto Plásmidos
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <button className="cta-btn secondary" onClick={() => {
              navigate('/');
              setTimeout(() => {
                const el = document.getElementById('constructor-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}>
              Diseñar Plásmido 🧬
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}