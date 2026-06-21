import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DnaHelixAnimation from '../components/DnaHelixAnimation';

export default function Inicio() {
  const navigate = useNavigate();

  // Customizer Dashboard Tabs: 'parts' (Molecular Selection), 'sequence' (DNA Sequencer), 'gel' (Electrophoresis)
  const [activeTab, setActiveTab] = useState('parts');

  // Interactive Plasmid Customizer States
  const [promoter, setPromoter] = useState('CMV');
  const [goi, setGoi] = useState('GFP');
  const [resistance, setResistance] = useState('AmpR');

  // DNA Sequence Editor States
  const [customGoiName, setCustomGoiName] = useState('MiGen_GOI');
  const [customGoiSeq, setCustomGoiSeq] = useState('ATGGTGAGCAAGGGCGAGGAGCTGTTCACCGGGGTGGTGCCCATCCTGGTCGAGCTGGACGGCGACGTAAACGGCCACAAGTTCAGCGTGTCCGGCGAGGGCGAGGGCGATGCCACCTACGGCAAGCTGACCCTGAAGTTCATCTGCACCACCGGCAAGCTG');
  const [customGoiColor, setCustomGoiColor] = useState('#db2777'); // Magenta Accent
  const [isCustomGoiActive, setIsCustomGoiActive] = useState(false);
  const [seqError, setSeqError] = useState('');

  // Enzyme Digestion States
  const [selectedEnzyme, setSelectedEnzyme] = useState('None');

  // Metadata details
  const promotersInfo = {
    CMV: { name: 'CMV (Citomegalovirus)', type: 'Eucariota fuerte', color: '#1e3a8a', size: 600, desc: 'Expresión transitoria masiva en mamíferos.' },
    EF1a: { name: 'EF1a (Factor de Elongación 1α)', type: 'Constitutivo fuerte', color: '#2563eb', size: 1200, desc: 'Expresión constante sin silenciamiento en células madre.' },
    T7: { name: 'T7 (Bacteriófago T7)', type: 'Procariota inducible', color: '#0284c7', size: 150, desc: 'Expresión inducible controlada en bacterias (E. coli).' }
  };

  const goisInfo = {
    GFP: { name: 'GFP (Fluorescente)', type: 'Reportero', color: '#16a34a', size: 720, desc: 'Proteína reportera verde brillante.' },
    Luciferasa: { name: 'Luciferasa (Biolum)', type: 'Reportero', color: '#ea580c', size: 1650, desc: 'Enzima luminiscente de alta sensibilidad.' },
    FLAG: { name: 'FLAG-Tag (Etiqueta)', type: 'Detección', color: '#ec4899', size: 24, desc: 'Corta etiqueta de purificación.' },
    Insulina: { name: 'Proinsulina', type: 'Terapéutico', color: '#7c3aed', size: 330, desc: 'Secuencia humana optimizada para E. coli.' }
  };

  const resistancesInfo = {
    AmpR: { name: 'Ampicilina (AmpR)', type: 'Selección bacteriana', color: '#4f46e5', size: 860, desc: 'Selección estándar rápida en bacterias.' },
    KanR: { name: 'Kanamicina (KanR)', type: 'Procariota alternativa', color: '#090d16', size: 800, desc: 'Gen de neomicina transferasa. Evita alergias en planta.' },
    PuroR: { name: 'Puromicina (PuroR)', type: 'Selección eucariota', color: '#e11d48', size: 600, desc: 'Selección rápida de líneas estables en mamíferos.' }
  };

  // Size Calculations
  const promoterSize = promotersInfo[promoter].size;
  const resistanceSize = resistancesInfo[resistance].size;
  const backboneSize = 3000;
  const goiSize = isCustomGoiActive ? Math.max(10, customGoiSeq.replace(/[^A-Za-z]/g, '').length) : goisInfo[goi].size;
  const totalSize = backboneSize + promoterSize + goiSize + resistanceSize;

  // Restriction Enzyme digestion profiles
  const enzymesList = {
    None: { name: 'Sin digestión', description: 'Plásmido circular intacto.' },
    EcoRI: { name: 'EcoRI', description: 'Corta una sola vez en el MCS (sitio de clonación múltiple).' },
    HindIII: { name: 'HindIII', description: 'Corta en dos sitios flanqueando el casete de expresión.' },
    BamHI: { name: 'BamHI', description: 'Corta en tres sitios distribuidos a lo largo del backbone y el gen.' }
  };

  // Calculate DNA fragment sizes after digestion
  const getDigestFragments = () => {
    if (selectedEnzyme === 'None') return [];
    if (selectedEnzyme === 'EcoRI') {
      return [totalSize];
    }
    if (selectedEnzyme === 'HindIII') {
      const insert = promoterSize + goiSize + resistanceSize;
      const vector = backboneSize;
      return [vector, insert].sort((a,b) => b-a);
    }
    if (selectedEnzyme === 'BamHI') {
      const frag1 = 1500;
      const frag2 = Math.round(promoterSize + (goiSize / 2));
      const frag3 = totalSize - frag1 - frag2;
      return [frag1, frag2, frag3].sort((a,b) => b-a);
    }
    return [];
  };

  // Mapping logarithmic migration in 1% agarose gel
  const getMigrationY = (bp) => {
    const minBP = 300;
    const maxBP = 10000;
    const minY = 50;
    const maxY = 210;
    
    const boundedBP = Math.max(minBP, Math.min(maxBP, bp));
    const logMin = Math.log10(minBP);
    const logMax = Math.log10(maxBP);
    const logVal = Math.log10(boundedBP);
    
    // Logarithmic relation: heavier molecules migrate less
    const pct = (logMax - logVal) / (logMax - logMin);
    return minY + pct * (maxY - minY);
  };

  // DNA sequence change handler with nucleotide validations
  const handleSeqChange = (e) => {
    const rawVal = e.target.value;
    setCustomGoiSeq(rawVal);

    // Filter characters to check for non-DNA letters
    const cleanSeq = rawVal.replace(/[^A-Za-z]/g, '');
    const illegalChars = cleanSeq.match(/[^atcgnATCGN]/g);

    if (illegalChars) {
      setSeqError(`Advertencia: La secuencia contiene caracteres no válidos (${[...new Set(illegalChars)].join(', ')}). Sólo se procesan nucleótidos A, T, C, G, N.`);
    } else if (cleanSeq.length === 0) {
      setSeqError('La secuencia de nucleótidos está vacía.');
    } else {
      setSeqError('');
    }
  };

  const handleSaveCustomGoi = (e) => {
    e.preventDefault();
    if (seqError || customGoiSeq.replace(/[^A-Za-z]/g, '').length === 0) {
      alert("Corrige los errores de secuencia antes de guardarla.");
      return;
    }
    setIsCustomGoiActive(true);
    setActiveTab('parts'); // Return to plasmid view to see the results
  };

  const getFunctionalSummary = () => {
    const p = promotersInfo[promoter];
    const gName = isCustomGoiActive ? customGoiName : goisInfo[goi].name;
    const r = resistancesInfo[resistance];
    return `Este plásmido pPlasmex-${promoter}-${gName}-${resistance} de ${totalSize.toLocaleString()} bp está configurado para la expresión de ${gName} impulsada por el promotor ${p.name}. Su selección se realiza bajo presión selectiva de ${r.name}. Esta combinación es ideal para: ${
      promoter === 'T7' 
        ? 'bioproducción rápida y expresión controlada en sistemas bacterianos.' 
        : 'estudios avanzados de transfección y modelaje celular en eucariotas.'
    }`;
  };

  const exportarConfiguracion = () => {
    const config = {
      promoter: promoter,
      promoterDesc: promotersInfo[promoter].name,
      goi: isCustomGoiActive ? 'Custom (' + customGoiName + ')' : goisInfo[goi].name,
      goiDesc: isCustomGoiActive ? `${customGoiSeq.length} bp sequence` : goisInfo[goi].desc,
      resistance: resistance,
      resistanceDesc: resistancesInfo[resistance].name,
      totalSize: totalSize,
      functionalDesc: getFunctionalSummary()
    };
    
    sessionStorage.setItem('plasmidConfig', JSON.stringify(config));
    navigate('/contacto');
  };

  // Gel Electrophoresis DNA Ladder markings (bp sizes)
  const ladderSizes = [10000, 8000, 6000, 5000, 4000, 3000, 2000, 1000, 500, 300];

  return (
    <div className="animate-fade-in relative">
      
      {/* 2-COLUMN HERO SECTION (CORPORATE & MINIMALIST) */}
      <header className="hero" style={{ minHeight: '75vh', paddingBottom: '3rem' }}>
        <div className="hero-grid">
          
          {/* Left Column: Copywriting and Two Large Buttons */}
          <div>
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--primary-light)', fontWeight: '700' }}>Suministro Genético Local</span>
            <h1 className="hero-title" style={{ marginTop: '0.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
              Plásmidos de <span>Pureza Certificada</span> para Investigación
            </h1>
            <p className="hero-subtitle">
              Aceleramos la biología molecular en México eliminando las trabas aduanales de importación. Sintetizamos, clonamos y purificamos vectores listos para transfectar con secuenciación NGS de trazabilidad completa.
            </p>

            <div className="hero-buttons">
              {/* Button 1: Customizer scroll */}
              <button 
                className="cta-btn" 
                style={{ padding: '1.2rem 2rem', justifyContent: 'space-between', borderRadius: 'var(--radius-lg)' }}
                onClick={() => {
                  const el = document.getElementById('constructor-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 12h8M12 8v8"></path>
                  </svg>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: '700', fontSize: '1rem' }}>Diseñar Plásmido</div>
                    <div style={{ fontSize: '0.75rem', opacity: '0.85', fontWeight: '400' }}>Configura promotores y genes en vivo</div>
                  </div>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>

              {/* Button 2: Direct Contact upload */}
              <button 
                className="cta-btn secondary" 
                style={{ padding: '1.2rem 2rem', justifyContent: 'space-between', borderRadius: 'var(--radius-lg)' }}
                onClick={() => navigate('/contacto?source=ready')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"></path>
                  </svg>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: '700', fontSize: '1rem' }}>Ya tengo mi plásmido</div>
                    <div style={{ fontSize: '0.75rem', opacity: '0.85', fontWeight: '400' }}>Carga tu archivo FASTA y ordena</div>
                  </div>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive D3 DNA Helix Animation */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <DnaHelixAnimation />
          </div>

        </div>
      </header>

      {/* TRUST / PARTNERS BANNER */}
      <section className="trust-banner animate-fade-in delay-3">
        <h3 className="trust-title">Colaborando y Respaldados por Investigación de Vanguardia</h3>
        <div className="trust-logos">
          <div className="trust-logo-item">
            <img src="/unam.svg" alt="UNAM" />
            <span>UNAM</span>
          </div>
          <div className="trust-logo-item">
            <img src="/LN_FESI.jpg" alt="FESI LN" />
            <span>L.N. FES Iztacala</span>
          </div>
        </div>
      </section>

      {/* 3-STEP GUIDE */}
      <section className="section" style={{ paddingTop: '1rem', paddingBottom: '3rem' }}>
        <div className="section-header">
          <h2 className="section-title">
            ¿Cómo generar tu <span>Lote de Plásmidos</span>?
          </h2>
          <p className="section-desc">
            Diseñamos un flujo ágil e interactivo enfocado en solventar requerimientos específicos de investigadores mexicanos con viabilidad asegurada.
          </p>
        </div>

        <div className="quick-guide-grid animate-slide-up">
          <div className="guide-step-card">
            <div className="guide-step-badge">1</div>
            <h4>Configuración Molecular</h4>
            <p>
              Elige los componentes moleculares en nuestro constructor interactivo inferior y verifica la viabilidad biológica con ayuda de nuestro visor en tiempo real.
            </p>
          </div>
          <div className="guide-step-card">
            <div className="guide-step-badge">2</div>
            <h4>Verificación por Expertos</h4>
            <p>
              Exporta tu diseño molecular al formulario. Uno de nuestros PhDs en genética verificará la secuencia en menos de 24 horas para garantizar una transfección viable.
            </p>
          </div>
          <div className="guide-step-card">
            <div className="guide-step-badge">3</div>
            <h4>Suministro y Certificación</h4>
            <p>
              Sintetizamos localmente y purificamos bajo estrictos controles. Recibes un lote listo para transfectar con documentación COA y secuenciación NGS incluida.
            </p>
          </div>
        </div>
      </section>

      {/* PERSUASIVE SCIENCE CALLOUT */}
      <section className="section" style={{ paddingTop: '0', paddingBottom: '2rem' }}>
        <div className="spotlight-card science-spotlight-card">
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--primary-teal)', fontWeight: '800' }}>🧬 Control de Inmunogenicidad</span>
          <h3 style={{ fontSize: '1.35rem', marginTop: '0.5rem', marginBottom: '1rem', lineHeight: '1.4' }}>
            Una transfección con plásmidos superenrollados libres de endotoxinas incrementa la viabilidad celular hasta en un 400%
          </h3>
          <p style={{ maxWidth: '700px', margin: '0 auto' }}>
            Los plásmidos de baja pureza activan los sensores inmunitarios intracelulares (como cGAS-STING), causando apoptosis prematura en cultivos de mamíferos. Con la calidad de transfección purificada de Plasmex, garantizas resultados reproducibles y libres de interferencias moleculares.
          </p>
        </div>
      </section>

      {/* PLASMID CONSTRUCTOR SECTION (SOBER INTEGRATED WORKSPACE) */}
      <section className="section" id="constructor-section">
        <div className="section-header">
          <h2 className="section-title">
            Espacio de Trabajo: <span>Constructor de Plásmidos</span>
          </h2>
          <p className="section-desc">
            Utiliza el menú de partes moleculares para diseñar, introduce secuencias customizadas en formato crudo, o ejecuta una digestión enzimática virtual en gel de agarosa.
          </p>
        </div>

        <div className="constructor-container animate-slide-up">
          {/* Controls Panel with Tabs */}
          <div className="constructor-controls">
            
            {/* Header Tabs */}
            <div className="constructor-tabs">
              <button 
                type="button" 
                className={`nav-btn ${activeTab === 'parts' ? 'active' : ''}`}
                onClick={() => setActiveTab('parts')}
              >
                Partes Moleculares
              </button>
              <button 
                type="button" 
                className={`nav-btn ${activeTab === 'sequence' ? 'active' : ''}`}
                onClick={() => setActiveTab('sequence')}
              >
                Editor de Secuencia (ADN)
              </button>
              <button 
                type="button" 
                className={`nav-btn ${activeTab === 'gel' ? 'active' : ''}`}
                onClick={() => setActiveTab('gel')}
              >
                Digestión y Gel
              </button>
            </div>

            {/* TAB 1: STANDARD PARTS SELECTION */}
            {activeTab === 'parts' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Promoter Control */}
                <div>
                  <h3 className="constructor-group-title">1. Selección del Promotor</h3>
                  <div className="constructor-options" style={{ marginTop: '0.5rem' }}>
                    {Object.keys(promotersInfo).map((key) => (
                      <button
                        key={key}
                        className={`option-button ${promoter === key ? 'active' : ''}`}
                        onClick={() => setPromoter(key)}
                      >
                        <span className="title">{key}</span>
                        <span className="subtitle">{promotersInfo[key].type}</span>
                      </button>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
                    {promotersInfo[promoter].desc}
                  </p>
                </div>

                {/* Gene of Interest (GOI) Control */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 className="constructor-group-title">2. Gen de Interés (GOI)</h3>
                    {isCustomGoiActive && (
                      <button 
                        type="button" 
                        className="config-clear-btn" 
                        onClick={() => setIsCustomGoiActive(false)}
                        style={{ fontSize: '0.75rem' }}
                      >
                        Restaurar Estándares
                      </button>
                    )}
                  </div>
                  
                  {isCustomGoiActive ? (
                    <div style={{ border: '1px solid #bfdbfe', background: '#eff6ff', padding: '1rem', borderRadius: 'var(--radius-sm)', marginTop: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--primary-teal)' }}>
                          🧬 {customGoiName} (Personalizado)
                        </span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                          {goiSize.toLocaleString()} bp
                        </span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                        Secuencia customizada cargada en el Editor. Los tamaños plasmídicos y digestiones están calculados basándose en este inserto.
                      </p>
                    </div>
                  ) : (
                    <div className="constructor-options" style={{ marginTop: '0.5rem' }}>
                      {Object.keys(goisInfo).map((key) => (
                        <button
                          key={key}
                          className={`option-button ${goi === key ? 'active' : ''}`}
                          onClick={() => setGoi(key)}
                        >
                          <span className="title">{key}</span>
                          <span className="subtitle">{goisInfo[key].type}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  {!isCustomGoiActive && (
                    <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
                      {goisInfo[goi].desc}
                    </p>
                  )}
                </div>

                {/* Resistance Control */}
                <div>
                  <h3 className="constructor-group-title">3. Marcador de Selección</h3>
                  <div className="constructor-options" style={{ marginTop: '0.5rem' }}>
                    {Object.keys(resistancesInfo).map((key) => (
                      <button
                        key={key}
                        className={`option-button ${resistance === key ? 'active' : ''}`}
                        onClick={() => setResistance(key)}
                      >
                        <span className="title">{key}</span>
                        <span className="subtitle">{resistancesInfo[key].type}</span>
                      </button>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
                    {resistancesInfo[resistance].desc}
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: DNA SEQUENCE EDITOR & ANNOTATION */}
            {activeTab === 'sequence' && (
              <form onSubmit={handleSaveCustomGoi} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 className="constructor-group-title">Secuenciador de ADN y Anotaciones</h3>
                
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Nombre de la Parte Genética (GOI) *</label>
                  <input
                    type="text"
                    className="minimal-input"
                    value={customGoiName}
                    onChange={(e) => setCustomGoiName(e.target.value.replace(/[^A-Za-z0-9_-]/g, ''))}
                    placeholder="Ej. MiGen_GOI"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Secuencia Nucleotídica Cruda (5' a 3') *</label>
                  <textarea
                    className="minimal-textarea"
                    value={customGoiSeq}
                    onChange={handleSeqChange}
                    placeholder="Escribe o pega nucleótidos ATCG..."
                    style={{ minHeight: '110px', fontSize: '0.85rem', fontFamily: 'monospace', letterSpacing: '0.05em' }}
                    required
                  ></textarea>
                  {seqError && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--accent-rose)', fontWeight: '600' }}>{seqError}</p>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    <span>Longitud: <strong>{customGoiSeq.replace(/[^A-Za-z]/g, '').length.toLocaleString()} bp</strong></span>
                    <span>Huésped: Optimización disponible</span>
                  </div>
                </div>

                <div className="form-grid" style={{ gap: '0.75rem', marginBottom: '0' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.8rem' }}>Color de Anotación en Mapa</label>
                    <select
                      className="minimal-input"
                      value={customGoiColor}
                      onChange={(e) => setCustomGoiColor(e.target.value)}
                      style={{ padding: '0.5rem' }}
                    >
                      <option value="#db2777">Rosa Magenta</option>
                      <option value="#f59e0b">Ámbar Metálico</option>
                      <option value="#8b5cf6">Lila Violeta</option>
                      <option value="#06b6d4">Turquesa Acero</option>
                      <option value="#10b981">Esmeralda Claro</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <button 
                      type="submit" 
                      className="cta-btn" 
                      style={{ width: '100%', padding: '0.7rem' }}
                    >
                      Cargar Secuencia
                    </button>
                  </div>
                </div>

                <p style={{ fontSize: '0.75rem', color: 'var(--text-dark)', lineHeight: '1.4' }}>
                  Al guardar la secuencia, esta reemplazará el Gen de Interés estándar de la visualización y se empleará para calcular el peso molecular molecular de la digestión enzimática virtual.
                </p>
              </form>
            )}

            {/* TAB 3: RESTRICTION ENZYMES DIGESTION & GEL SIMULATOR */}
            {activeTab === 'gel' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 className="constructor-group-title">Digestiones Enzimáticas Virtuales</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  Simula la digestión por restricción de tu plásmido y visualiza las bandas en un Gel de Agarosa al 1% de electroforesis teórica.
                </p>

                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Seleccionar Enzima de Restricción</label>
                  <select
                    className="minimal-input"
                    value={selectedEnzyme}
                    onChange={(e) => setSelectedEnzyme(e.target.value)}
                  >
                    {Object.keys(enzymesList).map(key => (
                      <option key={key} value={key}>{enzymesList[key].name}</option>
                    ))}
                  </select>
                </div>

                <div style={{ background: '#f8fafc', padding: '1rem', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.25rem', color: 'var(--primary-teal)' }}>
                    Perfil: {enzymesList[selectedEnzyme].name}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', lineHeight: '1.4' }}>
                    {enzymesList[selectedEnzyme].description}
                  </p>
                  
                  {selectedEnzyme !== 'None' && (
                    <div style={{ fontSize: '0.8rem' }}>
                      <span style={{ fontWeight: '600' }}>Bandas resultantes:</span>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                        {getDigestFragments().map((frag, idx) => (
                          <span key={idx} style={{ background: '#ffffff', border: '1px solid var(--border-glass)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: '700' }}>
                            {frag.toLocaleString()} bp
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <p style={{ fontSize: '0.75rem', color: 'var(--text-dark)', lineHeight: '1.4' }}>
                  El peso molecular es calculado dinámicamente sumando la longitud de los promotores, resistencias y secuencias customizadas que hayas cargado en el editor.
                </p>
              </div>
            )}

          </div>

          {/* Visualization Panel (Dual layout: Plasmid Map or Agarose Gel) */}
          <div className="constructor-preview">
            
            {activeTab === 'gel' && selectedEnzyme !== 'None' ? (
              /* ELECTROPHORESIS AGAROSE GEL SYSTEM */
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '1rem', fontWeight: '700', color: 'var(--primary-teal)' }}>
                  Gel de Agarosa 1% (Virtual)
                </h4>
                
                {/* Gel Tray Draw */}
                <div style={{ background: '#0f172a', width: '200px', height: '240px', borderRadius: '4px', position: 'relative', border: '3px solid #64748b', boxShadow: 'inset 0 4px 15px rgba(0,0,0,0.6)' }}>
                  <svg width="100%" height="100%">
                    
                    {/* Wells Tray Line */}
                    <line x1="0" y1="35" x2="200" y2="35" stroke="#475569" strokeWidth="4" />
                    
                    {/* Well 1: Ladder */}
                    <rect x="25" y="28" width="20" height="6" fill="#1e293b" rx="1" />
                    <text x="35" y="24" textAnchor="middle" fill="#94a3b8" fontSize="7" fontWeight="700">MW</text>

                    {/* Well 2: Uncut Plasmid */}
                    <rect x="85" y="28" width="20" height="6" fill="#1e293b" rx="1" />
                    <text x="95" y="24" textAnchor="middle" fill="#94a3b8" fontSize="7" fontWeight="700">Intacto</text>

                    {/* Well 3: Digestion */}
                    <rect x="145" y="28" width="20" height="6" fill="#1e293b" rx="1" />
                    <text x="155" y="24" textAnchor="middle" fill="#3b82f6" fontSize="7" fontWeight="700">{selectedEnzyme}</text>

                    {/* LANE 1 BANDS: DNA LADDER */}
                    {ladderSizes.map((sz, idx) => {
                      const y = getMigrationY(sz);
                      return (
                        <g key={idx}>
                          {/* Ladder fluorescent band */}
                          <line x1="26" y1={y} x2="44" y2={y} stroke="#e2e8f0" strokeWidth="2.5" opacity="0.8" />
                          {/* Label size */}
                          {idx % 2 === 0 && (
                            <text x="15" y={y + 2.5} fill="#475569" fontSize="6.5" textAnchor="end" fontWeight="600">{sz >= 1000 ? (sz/1000)+'k' : sz}</text>
                          )}
                        </g>
                      );
                    })}

                    {/* LANE 2 BANDS: UNCUT DNA (Open circular and supercoiled bands near top) */}
                    <line x1="86" y1={getMigrationY(9500)} x2="104" y2={getMigrationY(9500)} stroke="#2563eb" strokeWidth="2.5" opacity="0.8" />
                    <line x1="86" y1={getMigrationY(3500)} x2="104" y2={getMigrationY(3500)} stroke="#2563eb" strokeWidth="2" opacity="0.6" />

                    {/* LANE 3 BANDS: DIGESTED DNA FRAGMENTS */}
                    {getDigestFragments().map((fragSize, idx) => {
                      const y = getMigrationY(fragSize);
                      return (
                        <g key={idx}>
                          {/* Fragment band */}
                          <line x1="146" y1={y} x2="164" y2={y} stroke="#60a5fa" strokeWidth="3" style={{ filter: 'drop-shadow(0 0 2px #3b82f6)' }} />
                          {/* Size Tag next to it */}
                          <text x="170" y={y + 3.5} fill="#94a3b8" fontSize="7.5" fontWeight="700">{fragSize.toLocaleString()} bp</text>
                        </g>
                      );
                    })}

                  </svg>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span>MW: 1Kb DNA Ladder</span>
                  <span>Gel: Agarosa 1%</span>
                </div>
              </div>
            ) : (
              /* DYNAMIC CIRCULAR PLASMID MAP */
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="plasmid-svg-container">
                  <svg width="100%" height="100%" viewBox="0 0 200 200">
                    {/* Base Plasmid circle */}
                    <circle cx="100" cy="100" r="70" fill="none" stroke="#e2e8f0" strokeWidth="8" />

                    {/* Origin / Backbone segment (Fixed - Slate gray) - Arc 4 (Starts at 370, length 70) */}
                    <circle
                      cx="100"
                      cy="100"
                      r="70"
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="10"
                      strokeDasharray="70 440"
                      strokeDashoffset="-370"
                    />

                    {/* Promoter segment - Arc 1 (Starts at 0, length 110) */}
                    <circle
                      cx="100"
                      cy="100"
                      r="70"
                      fill="none"
                      stroke={promotersInfo[promoter].color}
                      strokeWidth="10"
                      strokeDasharray="110 440"
                      strokeDashoffset="0"
                      style={{ transition: 'stroke 0.4s ease' }}
                    />

                    {/* GOI segment - Arc 2 (Starts at 110, length 160) */}
                    <circle
                      cx="100"
                      cy="100"
                      r="70"
                      fill="none"
                      stroke={isCustomGoiActive ? customGoiColor : goisInfo[goi].color}
                      strokeWidth="10"
                      strokeDasharray="160 440"
                      strokeDashoffset="-110"
                      style={{ transition: 'stroke 0.4s ease' }}
                    />

                    {/* Resistance segment - Arc 3 (Starts at 270, length 100) */}
                    <circle
                      cx="100"
                      cy="100"
                      r="70"
                      fill="none"
                      stroke={resistancesInfo[resistance].color}
                      strokeWidth="10"
                      strokeDasharray="100 440"
                      strokeDashoffset="-270"
                      style={{ transition: 'stroke 0.4s ease' }}
                    />

                    {/* Annotation Labels pointing inside */}
                    <text x="100" y="95" textAnchor="middle" fill="#475569" fontSize="8" fontWeight="600" letterSpacing="0.05em">pPLASMEX</text>
                    <text x="100" y="112" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="800" fontFamily="monospace">
                      {promoter}-{isCustomGoiActive ? customGoiName : goi}
                    </text>
                    <text x="100" y="125" textAnchor="middle" fill="#1e3a8a" fontSize="7" fontWeight="700">{resistance}</text>
                  </svg>
                </div>

                {/* Plasmid Metadata Legend */}
                <div className="plasmid-label">
                  <h4>Configuración Molecular</h4>
                  <p style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>
                    {getFunctionalSummary()}
                  </p>
                  
                  <button 
                    className="cta-btn constructor-export-btn"
                    onClick={exportarConfiguracion}
                  >
                    Generar Pedido de este Plásmido
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

    </div>
  );
}