import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    institucion: "",
    servicio: "Síntesis y Clonación",
    pureza: "Transfection Grade",
    cantidad: "100 µg",
    mensaje: ""
  });

  const [plasmidConfig, setPlasmidConfig] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(""); // "", "success", "error"
  const [fastaFileName, setFastaFileName] = useState("");
  const [isDirectOrder, setIsDirectOrder] = useState(false);

  // Check for plasmid constructor config or URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    // 1. Check if user selected "Ya tengo mi plásmido" in Hero
    const sourceParam = params.get('source');
    if (sourceParam === 'ready') {
      setIsDirectOrder(true);
      setFormData(prev => ({
        ...prev,
        mensaje: "Hola, ya cuento con la secuencia específica para mi plásmido. [Por favor, adjunta tu archivo FASTA abajo o copia la secuencia nucleotídica directamente en este campo]"
      }));
    }

    // 2. Check for plasmid constructor config
    const savedConfig = sessionStorage.getItem('plasmidConfig');
    if (savedConfig && sourceParam !== 'ready') {
      const config = JSON.parse(savedConfig);
      setPlasmidConfig(config);

      // Pre-populate the details text area with the molecular layout
      setFormData(prev => ({
        ...prev,
        mensaje: `Hola, me interesa recibir una cotización detallada para un vector personalizado con la siguiente especificación:

- Promotor: ${config.promoter} (${config.promoterDesc})
- Gen de Interés (GOI): ${config.goi} (${config.goiDesc})
- Marcador de Selección: ${config.resistance} (${config.resistanceDesc})

[Por favor, detalla costos y tiempos de entrega estimados en base a estas características]`
      }));
    }

    // 3. Parse URL parameters for pre-selected service
    const serviceParam = params.get('servicio');
    if (serviceParam) {
      let mappedService = "Síntesis y Clonación";
      if (serviceParam === "Clonación") mappedService = "Clonación en Vector de Destino";
      else if (serviceParam === "Purificación") mappedService = "Purificación a Escala (Maxi/Giga)";
      else if (serviceParam === "Consultoría") mappedService = "Consultoría e Integración";
      
      setFormData(prev => ({
        ...prev,
        servicio: mappedService
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleClearConfig = () => {
    sessionStorage.removeItem('plasmidConfig');
    setPlasmidConfig(null);
    setFormData(prev => ({
      ...prev,
      mensaje: ""
    }));
  };

  // FASTA file parsing and attachment logic
  const handleFastaUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFastaFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      
      // Basic FASTA validation (checks for initial > header and characters)
      const cleanText = text.trim();
      if (cleanText.startsWith('>')) {
        setFormData(prev => {
          // Avoid duplicating FASTA sequence if they upload multiple times
          const cleanPrevMessage = prev.mensaje.replace(/\n\n\[Archivo FASTA cargado:[\s\S]*$/, "");
          return {
            ...prev,
            mensaje: `${cleanPrevMessage}\n\n[Archivo FASTA cargado: "${file.name}"]:\n${cleanText}`
          };
        });
      } else {
        alert("El archivo no tiene un formato FASTA válido. Debe iniciar con el carácter '>' seguido del identificador de la secuencia.");
        setFastaFileName("");
      }
    };
    reader.readAsText(file);
  };

  const enviarCorreo = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    // Compile a highly professional email message body
    const finalMessage = `
--- SOLICITUD DE COTIZACIÓN PLASMEX ---

INFORMACIÓN DE CONTACTO:
- Nombre: ${formData.nombre}
- Email: ${formData.email}
- Institución/Empresa: ${formData.institucion || 'No especificada'}

DETALLES DEL SERVICIO:
- Servicio solicitado: ${formData.servicio}
- Grado de pureza: ${formData.pureza}
- Cantidad deseada: ${formData.cantidad}
- Archivo FASTA adjunto: ${fastaFileName ? `Sí (${fastaFileName})` : 'No'}

DETALLES ADICIONALES Y CONFIGURACIÓN:
${formData.mensaje}
    `;

    emailjs.send(
      "service_my2xicp",
      "template_60zc3pf",
      {
        title: "Solicitud de cotización estructurada",
        name: formData.nombre,
        email: formData.email,
        message: finalMessage
      },
      "WJsJ9u1DmjeEHuzFL"
    )
      .then(() => {
        setSubmitStatus("success");
        setIsSubmitting(false);
        // Clear forms and config on success
        setFormData({ 
          nombre: "", 
          email: "", 
          institucion: "", 
          servicio: "Síntesis y Clonación", 
          pureza: "Transfection Grade", 
          cantidad: "100 µg", 
          mensaje: "" 
        });
        sessionStorage.removeItem('plasmidConfig');
        setPlasmidConfig(null);
        setFastaFileName("");
      })
      .catch((error) => {
        console.error("EmailJS Error: ", error);
        setSubmitStatus("error");
        setIsSubmitting(false);
      });
  };

  return (
    <div className="animate-fade-in">
      
      {/* HERO SECTION */}
      <header className="hero" style={{ minHeight: '45vh' }}>
        <h1 className="hero-title">
          Inicia tu <span>Proyecto</span>
        </h1>
        <p className="hero-subtitle animate-slide-up delay-1">
          Completa el formulario científico técnico de solicitud. Nuestro equipo de doctores en biología molecular analizará tu secuencia y enviará una propuesta formal en menos de 24 horas.
        </p>
      </header>

      {/* FORM SECTION */}
      <section className="section" style={{ paddingTop: '0' }}>
        <div className="contact-wrapper animate-slide-up delay-2">
          
          {submitStatus === "success" ? (
            /* SUCCESS STATE SCREEN */
            <div className="success-screen">
              <div className="success-icon-wrapper">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h3>¡Solicitud Enviada!</h3>
              <p>
                Hemos recibido tu configuración molecular con éxito. Un especialista de Plasmex Biotech se pondrá en contacto contigo vía correo electrónico para coordinar el mapa de plásmidos final y la cotización de laboratorio.
              </p>
              <button 
                className="cta-btn" 
                onClick={() => {
                  setSubmitStatus("");
                  setIsDirectOrder(false);
                }}
                style={{ minWidth: '200px' }}
              >
                Enviar otra Solicitud
              </button>
            </div>
          ) : (
            /* REQUEST FORM SCREEN */
            <form onSubmit={enviarCorreo}>
              
              {/* Informational Header for Direct Order */}
              {isDirectOrder && (
                <div className="config-alert-box" style={{ borderColor: 'var(--primary-light)', background: '#eff6ff' }}>
                  <div className="config-alert-header">
                    <span className="config-alert-title" style={{ color: 'var(--primary-teal)' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                      Orden Directa de Secuencia de ADN
                    </span>
                    <button 
                      type="button" 
                      className="config-clear-btn"
                      onClick={() => setIsDirectOrder(false)}
                    >
                      Regresar a cotización general
                    </button>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    Por favor, carga tu secuencia en formato FASTA usando el botón de archivos abajo o copia el texto en la caja de descripción. Diseñamos directamente sobre tu secuencia verificada.
                  </p>
                </div>
              )}

              {/* Dynamic Alert Box for Plasmid Customizer load */}
              {plasmidConfig && !isDirectOrder && (
                <div className="config-alert-box">
                  <div className="config-alert-header">
                    <span className="config-alert-title">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                      </svg>
                      ADN Recombinante Configurado
                    </span>
                    <button 
                      type="button" 
                      className="config-clear-btn"
                      onClick={handleClearConfig}
                    >
                      Remover y limpiar
                    </button>
                  </div>
                  <div className="config-alert-grid">
                    <div className="config-alert-tag">Promotor: {plasmidConfig.promoter}</div>
                    <div className="config-alert-tag">Gen: {plasmidConfig.goi}</div>
                    <div className="config-alert-tag">Resistencia: {plasmidConfig.resistance}</div>
                  </div>
                </div>
              )}

              {/* Grid Layout Inputs */}
              <div className="form-grid">
                
                <div className="form-group">
                  <label className="form-label">Nombre Completo *</label>
                  <input
                    type="text"
                    name="nombre"
                    className="minimal-input"
                    placeholder="Dr(a). Nombre Apellido"
                    value={formData.nombre}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Correo Electrónico Institucional *</label>
                  <input
                    type="email"
                    name="email"
                    className="minimal-input"
                    placeholder="nombre@universidad.edu.mx"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Institución o Empresa</label>
                  <input
                    type="text"
                    name="institucion"
                    className="minimal-input"
                    placeholder="Ej. UNAM - FES Iztacala"
                    value={formData.institucion}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Tipo de Servicio *</label>
                  <select
                    name="servicio"
                    className="minimal-input"
                    value={formData.servicio}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                  >
                    <option value="Síntesis y Clonación">Síntesis de Genes + Clonación en Vector</option>
                    <option value="Clonación en Vector de Destino">Clonación en Vector Plasmex / Cliente</option>
                    <option value="Purificación a Escala (Maxi/Giga)">Purificación de ADN a Gran Escala</option>
                    <option value="Consultoría e Integración">Consultoría de Bioprocesos y Escalamiento</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Grado de Pureza Requerido *</label>
                  <select
                    name="pureza"
                    className="minimal-input"
                    value={formData.pureza}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                  >
                    <option value="Research Grade">Research Grade (Fácil expresión, subclonados)</option>
                    <option value="Transfection Grade">Transfection Grade (Bajo endotoxinas, cultivo celular)</option>
                    <option value="Pre-clinical / GMP-like">Pre-clinical / GMP-like (Máxima pureza in vivo)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Cantidad Estimada *</label>
                  <select
                    name="cantidad"
                    className="minimal-input"
                    value={formData.cantidad}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                  >
                    <option value="100 µg">100 µg (Lote estándar)</option>
                    <option value="1 mg">1 mg (Escalamiento mediano)</option>
                    <option value="10 mg">10 mg (Producción piloto)</option>
                    <option value="100 mg+">100 mg o más (Escala pre-clínica)</option>
                    <option value="No estoy seguro">Por determinar con asesoría</option>
                  </select>
                </div>

                {/* FASTA File Attachment Field (NEW) */}
                <div className="form-group full-width">
                  <label className="form-label">Cargar Archivo FASTA (.fasta, .fa, .txt)</label>
                  <input
                    type="file"
                    accept=".fasta,.fa,.txt"
                    className="minimal-input"
                    onChange={handleFastaUpload}
                    disabled={isSubmitting}
                    style={{ padding: '0.6rem 1rem' }}
                  />
                  {fastaFileName && (
                    <p style={{ fontSize: '0.85rem', color: 'var(--accent-emerald)', fontWeight: '600', marginTop: '0.25rem' }}>
                      ✓ Archivo FASTA cargado con éxito: {fastaFileName} (Agregado al mensaje de abajo)
                    </p>
                  )}
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-dark)', marginTop: '0.25rem' }}>
                    Soporta archivos de formato FASTA estándar conteniendo la secuencia nucleotídica completa para síntesis directa.
                  </p>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Detalles del Proyecto y Especificaciones Secuenciales *</label>
                  <textarea
                    name="mensaje"
                    className="minimal-textarea"
                    placeholder="Detalla los mapas plasmídicos, insertos, tamaños en pares de bases (bp) y cualquier requerimiento biológico especial..."
                    value={formData.mensaje}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                  ></textarea>
                </div>

              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                className="cta-btn"
                style={{ width: '100%', borderRadius: 'var(--radius-md)' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    <span>Procesando Solicitud Molecular...</span>
                  </>
                ) : (
                  <>
                    <span>Enviar Solicitud de Cotización</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}

          {submitStatus === "error" && (
            <p className="form-status error">
              Hubo un problema de conexión al enviar el formulario a través de los servidores. Por favor, reintente o póngase en contacto directamente escribiendo al soporte técnico.
            </p>
          )}
        </div>
      </section>

    </div>
  );
}