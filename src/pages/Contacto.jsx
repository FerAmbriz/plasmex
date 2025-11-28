import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const enviarCorreo = (e) => {
    e.preventDefault();

    emailjs.send(
      "service_my2xicp",
      "template_60zc3pf",
      {
        title: "Solicitud de cotización",
        name: formData.nombre,
        email: formData.email,
        message: formData.mensaje
      },
      "WJsJ9u1DmjeEHuzFL"
    )
      .then(() => {
        setStatus("Tu solicitud se ha enviado correctamente.");
        setFormData({ nombre: "", email: "", mensaje: "" });
      })
      .catch(() => {
        setStatus("Error al enviar el mensaje, intenta de nuevo.");
      });
  };

  return (
    <div className="animate-fade-in">
      <header className="hero" style={{ minHeight: '40vh' }}>
        <h1 className="section-title" style={{ marginBottom: '1rem' }}>
          Inicia tu <span>Proyecto</span>
        </h1>
        <p className="hero-subtitle animate-slide-up delay-1">
          Cuéntanos tus necesidades y recibe una cotización personalizada en menos de 24 horas.
        </p>
      </header>

      <section className="section">
        <div className="contact-wrapper animate-slide-up delay-2">
          <form onSubmit={enviarCorreo}>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Nombre</label>
              <input
                type="text"
                name="nombre"
                className="minimal-input"
                placeholder="Tu nombre completo"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Correo Electrónico</label>
              <input
                type="email"
                name="email"
                className="minimal-input"
                placeholder="nombre@empresa.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Detalles del Proyecto</label>
              <textarea
                name="mensaje"
                className="minimal-textarea"
                placeholder="Describe los plásmidos, cantidades o servicios que necesitas..."
                value={formData.mensaje}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="cta-btn"
              style={{ width: '100%', borderRadius: 'var(--radius-md)' }}
            >
              Enviar Solicitud
            </button>
          </form>

          {status && (
            <p className={`form-status ${status.includes("Error") ? "error" : ""}`} style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              {status}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}