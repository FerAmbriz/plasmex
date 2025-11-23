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
    <div>
      <header className="hero">
        <h1>Contacto</h1>
      </header>

      <section className="section">

        {/* CONTENEDOR 100% */}
        <div className="servicios-destacados" style={{ padding: "2rem", width: "100%" }}>

          {/* FORM FULL WIDTH */}
          <form 
            onSubmit={enviarCorreo} 
            className="form-box" 
            style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1.2rem" }}
          >

            <h2>Solicita una Cotización</h2>

            <input
              type="text"
              name="nombre"
              className="form-input"
              placeholder="Tu nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Tu correo"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <textarea
              name="mensaje"
              className="form-textarea"
              placeholder="Describe la cotización que deseas"
              rows="5"
              value={formData.mensaje}
              onChange={handleChange}
              required
            ></textarea>

            {/* BOTÓN */}
            <button 
              type="submit" 
              className="form-btn" 
              style={{ width: "10%", display: "block" }}
            >
              Enviar
            </button>

          </form>

          {/* STATUS */}
          {status && (
            <p className={`form-status ${status.includes("Error") ? "error" : ""}`}>
              {status}
            </p>
          )}

        </div>
      </section>
    </div>
  );
}