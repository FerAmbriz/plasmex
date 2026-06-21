#!/usr/bin/env python3
import os
import sys
from fpdf import FPDF

# Color Palette Definitions
RGB_BG_DARK = (10, 25, 47)        # #0a192f (Deep corporate navy)
RGB_CARD_DARK = (23, 42, 69)      # #172a45 (Teal dark card)
RGB_TEAL_BRIGHT = (13, 148, 136)  # #0d9488 (Vibrant brand teal)
RGB_BLUE_ACCENT = (37, 99, 235)   # #2563eb (Royal blue accent)
RGB_EMERALD = (16, 185, 129)      # #10b981 (Positive green)
RGB_ROSE = (225, 29, 72)          # #e11d48 (Rose accent)

RGB_BG_LIGHT = (248, 250, 252)    # #f8fafc (Slate light bg)
RGB_CARD_LIGHT = (255, 255, 255)  # #ffffff (Pure white)
RGB_TEXT_DARK = (15, 23, 42)       # #0f172a (Primary text dark)
RGB_TEXT_MUTED = (71, 85, 105)    # #475569 (Secondary slate text)
RGB_TEXT_LIGHT = (248, 250, 252)  # #f8fafc (Primary text light)
RGB_TEXT_SLATE = (148, 163, 184)  # #94a3b8 (Secondary text light)
RGB_BORDER = (226, 232, 240)      # #e2e8f0 (Light gray border)

class PlasmexPDF(FPDF):
    def __init__(self):
        # A4 Landscape: 297mm x 210mm
        super().__init__(orientation="landscape", unit="mm", format="A4")
        self.set_margins(0, 0, 0)
        self.set_auto_page_break(False)

    def rect(self, x, y, w, h, style='', round_corners=False, corner_radius=0):
        if round_corners and corner_radius > 0:
            xl = x * self.k
            xr = (x + w) * self.k
            yt = (self.h - y) * self.k
            yb = (self.h - (y + h)) * self.k
            rk = corner_radius * self.k
            dp = rk * 0.5522847
            xli = xl + rk
            xri = xr - rk
            yti = yt - rk
            ybi = yb + rk
            op = 'f' if style == 'F' else ('B' if style in ('FD', 'DF') else 'S')
            self._out(f"{xl:.2f} {ybi:.2f} m")
            self._out(f"{xl:.2f} {yti:.2f} l")
            self._out(f"{xl:.2f} {yti + dp:.2f} {xli - dp:.2f} {yt:.2f} {xli:.2f} {yt:.2f} c")
            self._out(f"{xri:.2f} {yt:.2f} l")
            self._out(f"{xri + dp:.2f} {yt:.2f} {xr:.2f} {yti + dp:.2f} {xr:.2f} {yti:.2f} c")
            self._out(f"{xr:.2f} {ybi:.2f} l")
            self._out(f"{xr:.2f} {ybi - dp:.2f} {xri + dp:.2f} {yb:.2f} {xri:.2f} {yb:.2f} c")
            self._out(f"{xli:.2f} {yb:.2f} l")
            self._out(f"{xli - dp:.2f} {yb:.2f} {xl:.2f} {ybi - dp:.2f} {xl:.2f} {ybi:.2f} c")
            self._out(f"h {op}")
        else:
            super().rect(x, y, w, h, style)

    def draw_bg_dark(self):
        """Draws full page dark background."""
        self.set_fill_color(*RGB_BG_DARK)
        self.rect(0, 0, 297, 210, "F")
        
        # Subtle abstract biological background shapes (Plasmids)
        self.set_draw_color(*RGB_CARD_DARK)
        self.set_line_width(1.5)
        # Giant background decorative ring
        self.ellipse(220, -30, 160, 160, "D")
        self.ellipse(230, -20, 140, 140, "D")
        
        self.set_draw_color(*RGB_TEAL_BRIGHT)
        self.set_line_width(0.5)
        # Small decorative dotted plasmid
        self.ellipse(250, 30, 40, 40, "D")
        
        # Left accent line
        self.set_fill_color(*RGB_TEAL_BRIGHT)
        self.rect(0, 0, 4, 210, "F")

    def draw_bg_light(self):
        """Draws full page light background with a technical dot-grid pattern."""
        self.set_fill_color(*RGB_BG_LIGHT)
        self.rect(0, 0, 297, 210, "F")
        
        # Dot Grid Background (evokes blueprint/engineering theme)
        self.set_fill_color(226, 232, 240)
        for x in range(15, 290, 15):
            for y in range(15, 195, 15):
                self.rect(x, y, 0.4, 0.4, "F")
        
        # Bottom decorative bar
        self.set_fill_color(*RGB_BG_DARK)
        self.rect(0, 204, 297, 6, "F")
        
        # Left accent line
        self.set_fill_color(*RGB_TEAL_BRIGHT)
        self.rect(0, 0, 4, 210, "F")

    def draw_slide_header(self, category, title, dark_mode=False):
        """Draws a standardized slide header with category and title."""
        # Category
        self.set_xy(15, 12)
        self.set_font("Helvetica", "B", 9)
        self.set_text_color(*RGB_TEAL_BRIGHT)
        self.cell(267, 5, category.upper())
        self.ln(5)

        # Title
        self.set_xy(15, 17)
        self.set_font("Helvetica", "B", 20)
        self.set_text_color(*(RGB_TEXT_DARK if not dark_mode else RGB_TEXT_LIGHT))
        self.cell(267, 8, title)
        self.ln(8)

        # Accent Line below header
        self.set_draw_color(*(RGB_BORDER if not dark_mode else RGB_CARD_DARK))
        self.set_line_width(0.5)
        self.line(15, 27, 282, 27)

    def draw_slide_footer(self, page_num, total_pages=7, dark_mode=False):
        """Draws standard slide footer."""
        self.set_xy(15, 196)
        self.set_font("Helvetica", "", 8)
        self.set_text_color(*(RGB_TEXT_MUTED if not dark_mode else RGB_TEXT_SLATE))
        self.cell(100, 5, "Plasmex Biotech S.A. de C.V.  |  Suministro Genetico Local")
        
        self.set_xy(250, 196)
        self.cell(32, 5, f"Diapositiva {page_num} de {total_pages}", align="R")

    def draw_navigation(self, current_slide, total_slides=7, dark_mode=False):
        """Draws small horizontal navigation indicators in the top right header."""
        start_x = 236
        y = 14
        dot_w = 4
        dot_gap = 2.5
        for idx in range(1, total_slides + 1):
            cx = start_x + (idx - 1) * (dot_w + dot_gap)
            if idx == current_slide:
                self.set_fill_color(*RGB_TEAL_BRIGHT)
            else:
                self.set_fill_color(*(RGB_BORDER if not dark_mode else RGB_CARD_DARK))
            self.ellipse(cx, y, dot_w, dot_w, "F")

    def draw_card(self, x, y, w, h, title="", bg_color=RGB_CARD_LIGHT, border_color=RGB_BORDER, accent_color=None):
        """Draws a clean modern card with rounded corners, shadow effect, and custom header bar."""
        # Shadow effect (offset filled rectangle with rounded corners)
        shadow_offset = 1.2
        self.set_fill_color(241, 245, 249) if bg_color != RGB_CARD_DARK else self.set_fill_color(11, 19, 43)
        self.rect(x + shadow_offset, y + shadow_offset, w, h, "F", round_corners=True, corner_radius=3)
        
        # Main card rectangle with rounded corners
        self.set_fill_color(*bg_color)
        self.set_draw_color(*border_color)
        self.set_line_width(0.3)
        self.rect(x, y, w, h, "FD", round_corners=True, corner_radius=3)
        
        # Left accent vertical bar (rounded to blend)
        if accent_color:
            self.set_fill_color(*accent_color)
            self.rect(x, y, 2.5, h, "F", round_corners=True, corner_radius=1.5)
            
        # Title inside card
        if title:
            # Header bar background with rounded top corners
            if bg_color != RGB_CARD_DARK:
                self.set_fill_color(248, 250, 252)
                self.rect(x + (2.5 if accent_color else 0.3), y + 0.3, w - (2.8 if accent_color else 0.6), 11, "F", round_corners=True, corner_radius=2.5)
            else:
                self.set_fill_color(17, 34, 64)
                self.rect(x + (2.5 if accent_color else 0.3), y + 0.3, w - (2.8 if accent_color else 0.6), 11, "F", round_corners=True, corner_radius=2.5)
            
            self.set_xy(x + (5 if accent_color else 6), y + 3)
            self.set_font("Helvetica", "B", 10.5)
            if bg_color == RGB_CARD_DARK:
                self.set_text_color(*RGB_TEXT_LIGHT)
            else:
                self.set_text_color(*RGB_TEXT_DARK)
            self.cell(w - 10, 6, title)
            
            # Bottom divider of header bar
            self.set_draw_color(*(RGB_BORDER if bg_color != RGB_CARD_DARK else RGB_BG_DARK))
            self.set_line_width(0.3)
            self.line(x + (2.5 if accent_color else 0.3), y + 11, x + w - 0.3, y + 11)
            return y + 15  # Returns Y offset for contents
        return y + 4

    def draw_square_bullet(self, x, y, color=RGB_TEAL_BRIGHT):
        """Draws a modern square bullet point."""
        self.set_fill_color(*color)
        self.rect(x, y + 1.2, 1.8, 1.8, "F")

def build_presentation():
    pdf = PlasmexPDF()
    total_slides = 7
    
    # ----------------------------------------------------
    # SLIDE 1: PORTADA (COVER PAGE)
    # ----------------------------------------------------
    pdf.add_page()
    pdf.draw_bg_dark()
    pdf.draw_navigation(1, total_slides, dark_mode=True)
    
    # Title & Subtitle Group
    pdf.set_xy(25, 60)
    pdf.set_font("Helvetica", "B", 42)
    pdf.set_text_color(*RGB_TEAL_BRIGHT)
    pdf.cell(200, 16, "PLASMEX BIOTECH")
    pdf.ln(16)
    
    pdf.set_xy(25, 78)
    pdf.set_font("Helvetica", "B", 18)
    pdf.set_text_color(*RGB_TEXT_LIGHT)
    pdf.cell(200, 10, "Suministro Genetico Local Certificado en Mexico")
    pdf.ln(10)
    
    # Divider line on cover
    pdf.set_draw_color(*RGB_TEAL_BRIGHT)
    pdf.set_line_width(1.5)
    pdf.line(25, 93, 140, 93)
    
    # Description
    pdf.set_xy(25, 100)
    pdf.set_font("Helvetica", "", 13)
    pdf.set_text_color(*RGB_TEXT_SLATE)
    pdf.multi_cell(180, 7, "Aceleramos la biologia molecular en el pais eliminando las barreras de importacion y aduanas. Vectores listos para transfectar con secuenciacion NGS de trazabilidad completa.", align="L")
    
    # Bullet points / Pillars at the bottom
    pdf.set_xy(25, 145)
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(*RGB_TEAL_BRIGHT)
    pdf.cell(55, 6, "PUREZA CERTIFICADA")
    pdf.set_text_color(*RGB_TEXT_LIGHT)
    pdf.set_font("Helvetica", "", 10)
    pdf.cell(10, 6, " | ")
    
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(*RGB_TEAL_BRIGHT)
    pdf.cell(50, 6, "ENTREGA EN DIAS")
    pdf.set_text_color(*RGB_TEXT_LIGHT)
    pdf.set_font("Helvetica", "", 10)
    pdf.cell(10, 6, " | ")
    
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(*RGB_TEAL_BRIGHT)
    pdf.cell(60, 6, "SOPORTE EXPERTO (PHD)")
    pdf.ln(6)
    
    # Footer
    pdf.draw_slide_footer(1, total_slides, dark_mode=True)
    
    # ----------------------------------------------------
    # SLIDE 2: EL DESAFIO Y PROPUESTA DE VALOR
    # ----------------------------------------------------
    pdf.add_page()
    pdf.draw_bg_light()
    pdf.draw_slide_header("El Desafio en Mexico", "Propuesta de Valor de Plasmex Biotech")
    pdf.draw_navigation(2, total_slides)
    
    # Two Columns (Cards)
    # Column 1: The Problem
    content_y = pdf.draw_card(15, 33, 128, 150, title="EL DESAFIO LOGISTICO Y CIENTIFICO", accent_color=RGB_ROSE)
    pdf.set_xy(23, content_y)
    
    bullets_problem = [
        ("Retrasos Aduanales Criticos", "La importacion de vectores moleculares desde EE. UU. o Europa tarda de 4 a 12 semanas, paralizando proyectos academicos e industriales."),
        ("Riesgo de Inmunogenicidad", "Los plasmidos purificados con metodos estandar contienen endotoxinas (LPS). Al transfectar cultivos celulares de mamifero, activan la ruta cGAS-STING, induciendo apoptosis y alterando los resultados."),
        ("Perdida de Trazabilidad", "En envios internacionales con hielo seco existe riesgo de fluctuacion de temperatura, degradando el ADN sin que el investigador lo note a tiempo.")
    ]
    
    for title, desc in bullets_problem:
        pdf.set_x(23)
        pdf.draw_square_bullet(pdf.get_x(), pdf.get_y(), RGB_ROSE)
        pdf.set_x(26)
        pdf.set_font("Helvetica", "B", 10.5)
        pdf.set_text_color(*RGB_ROSE)
        pdf.cell(110, 5, title)
        pdf.ln(5)
        pdf.set_x(26)
        pdf.set_font("Helvetica", "", 9.5)
        pdf.set_text_color(*RGB_TEXT_MUTED)
        pdf.multi_cell(110, 4.5, desc, align="L")
        pdf.ln(2.5)

    # Column 2: The Solution
    content_y2 = pdf.draw_card(154, 33, 128, 150, title="LA SOLUCION LOCAL Y CERTIFICADA", accent_color=RGB_EMERALD)
    pdf.set_xy(162, content_y2)
    
    bullets_solution = [
        ("Suministro y Sintesis Local", "Produccion directa en Mexico, reduciendo el tiempo de entrega a dias. Facturacion local y soporte directo sin tramites de importacion."),
        ("Calidad de Transfeccion (HQ)", "Proceso optimizado de purificacion por intercambio anionico que garantiza endotoxinas < 0.05 EU/ug, aumentando la viabilidad celular hasta en un 400%."),
        ("Trazabilidad Analitica", "Cada lote incluye secuenciacion capilar Sanger de las juntas de clonacion, y secuenciacion NGS completa de los plasmidos para garantizar la ausencia de mutaciones.")
    ]
    
    for title, desc in bullets_solution:
        pdf.set_x(162)
        pdf.draw_square_bullet(pdf.get_x(), pdf.get_y(), RGB_EMERALD)
        pdf.set_x(165)
        pdf.set_font("Helvetica", "B", 10.5)
        pdf.set_text_color(*RGB_EMERALD)
        pdf.cell(110, 5, title)
        pdf.ln(5)
        pdf.set_x(165)
        pdf.set_font("Helvetica", "", 9.5)
        pdf.set_text_color(*RGB_TEXT_MUTED)
        pdf.multi_cell(110, 4.5, desc, align="L")
        pdf.ln(2.5)
        
    pdf.draw_slide_footer(2, total_slides)

    # ----------------------------------------------------
    # SLIDE 3: PLATAFORMA INTERACTIVA (CONSTRUCTOR)
    # ----------------------------------------------------
    pdf.add_page()
    pdf.draw_bg_light()
    pdf.draw_slide_header("Herramientas Digitales", "Espacio de Trabajo y Constructor de Plasmidos")
    pdf.draw_navigation(3, total_slides)
    
    # Intro sentence
    pdf.set_xy(15, 31)
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(*RGB_TEXT_DARK)
    pdf.cell(267, 5, "Nuestra plataforma web cuenta con un laboratorio in silico integrado para el diseno interactivo y validacion de vectores:")
    pdf.ln(5)
    
    # 3 Columns
    col_w = 84
    col_h = 138
    gap = 8
    
    # Card 1: Parts Selector
    y_pos = 38
    x_1 = 15
    pdf.draw_card(x_1, y_pos, col_w, col_h, title="1. Selector de Partes", accent_color=RGB_BLUE_ACCENT)
    pdf.set_xy(x_1 + 6, y_pos + 16)
    pdf.set_font("Helvetica", "", 9.5)
    pdf.set_text_color(*RGB_TEXT_MUTED)
    pdf.multi_cell(col_w - 12, 4.5, "Permite configurar plasmidos seleccionando componentes biologicos validados en tiempo real:", align="L")
    pdf.ln(2)
    
    parts = [
        ("Promotores:", "CMV (mamiferos fuerte), EF1a (constitutivo sin silenciamiento), T7 (bacterias inducible)."),
        ("Genes de Interes (GOI):", "GFP, Luciferasa (reporteros), FLAG-Tag (purificacion), Proinsulina (terapeutico)."),
        ("Resistencia Antibiotica:", "AmpR, KanR (seleccion bacteriana), PuroR (mamiferos).")
    ]
    for label, desc in parts:
        pdf.set_x(x_1 + 6)
        pdf.draw_square_bullet(pdf.get_x(), pdf.get_y(), RGB_BLUE_ACCENT)
        pdf.set_x(x_1 + 9)
        pdf.set_font("Helvetica", "B", 9)
        pdf.set_text_color(*RGB_TEXT_DARK)
        pdf.cell(50, 4, label)
        pdf.ln(4)
        pdf.set_x(x_1 + 9)
        pdf.set_font("Helvetica", "", 8.5)
        pdf.set_text_color(*RGB_TEXT_MUTED)
        pdf.multi_cell(col_w - 15, 4, desc, align="L")
        pdf.ln(1)
        
    # Card 2: Sequence Editor
    x_2 = x_1 + col_w + gap
    pdf.draw_card(x_2, y_pos, col_w, col_h, title="2. Editor de Secuencias", accent_color=RGB_BLUE_ACCENT)
    pdf.set_xy(x_2 + 6, y_pos + 16)
    pdf.set_font("Helvetica", "", 9.5)
    pdf.set_text_color(*RGB_TEXT_MUTED)
    pdf.multi_cell(col_w - 12, 4.5, "Los investigadores pueden introducir secuencias personalizadas de nucleotidos (formato crudo o FASTA):", align="L")
    pdf.ln(2)
    
    seq_features = [
        ("Validacion en Vivo", "Filtra dinamicamente caracteres invalidos y advierte sobre nucleotidos no estandar en la secuencia."),
        ("Calculo Automatico de Peso", "Determina la longitud exacta en pares de bases (bp) del plasmido final al combinar el inserto con el vector backbone."),
        ("Visualizacion Dinamica", "Dibuja el mapa circular del plasmido y actualiza las anotaciones de forma grafica e interactiva.")
    ]
    for label, desc in seq_features:
        pdf.set_x(x_2 + 6)
        pdf.draw_square_bullet(pdf.get_x(), pdf.get_y(), RGB_BLUE_ACCENT)
        pdf.set_x(x_2 + 9)
        pdf.set_font("Helvetica", "B", 9)
        pdf.set_text_color(*RGB_TEXT_DARK)
        pdf.cell(50, 4, label)
        pdf.ln(4)
        pdf.set_x(x_2 + 9)
        pdf.set_font("Helvetica", "", 8.5)
        pdf.set_text_color(*RGB_TEXT_MUTED)
        pdf.multi_cell(col_w - 15, 4, desc, align="L")
        pdf.ln(1.5)

    # Card 3: Gel Simulator
    x_3 = x_2 + col_w + gap
    pdf.draw_card(x_3, y_pos, col_w, col_h, title="3. Digestion y Gel", accent_color=RGB_BLUE_ACCENT)
    pdf.set_xy(x_3 + 6, y_pos + 16)
    pdf.set_font("Helvetica", "", 9.5)
    pdf.set_text_color(*RGB_TEXT_MUTED)
    pdf.multi_cell(col_w - 12, 4.5, "Simulador molecular para predecir la fragmentacion fisica y verificar el diseno antes del laboratorio:", align="L")
    pdf.ln(2)
    
    gel_features = [
        ("Enzimas de Restriccion", "Permite ensayar digestiones con EcoRI (corta una vez), HindIII (corta dos veces flanqueando inserto) o BamHI (tres cortes)."),
        ("Migracion Logaritmica", "Calcula teoricamente la distancia recorrida en un gel de agarosa al 1% segun el peso molecular en bp (relacion logaritmica estandar)."),
        ("Visualizacion del Gel", "Genera un gel virtual con bandas fluorescentes comparadas contra un marcador de peso molecular (1Kb DNA Ladder).")
    ]
    for label, desc in gel_features:
        pdf.set_x(x_3 + 6)
        pdf.draw_square_bullet(pdf.get_x(), pdf.get_y(), RGB_BLUE_ACCENT)
        pdf.set_x(x_3 + 9)
        pdf.set_font("Helvetica", "B", 9)
        pdf.set_text_color(*RGB_TEXT_DARK)
        pdf.cell(50, 4, label)
        pdf.ln(4)
        pdf.set_x(x_3 + 9)
        pdf.set_font("Helvetica", "", 8.5)
        pdf.set_text_color(*RGB_TEXT_MUTED)
        pdf.multi_cell(col_w - 15, 4, desc, align="L")
        pdf.ln(1.5)
        
    pdf.draw_slide_footer(3, total_slides)

    # ----------------------------------------------------
    # SLIDE 4: SERVICIOS BIOTECNOLOGICOS PIPELINE (2x2 GRID)
    # ----------------------------------------------------
    pdf.add_page()
    pdf.draw_bg_light()
    pdf.draw_slide_header("Flujo de Trabajo", "Servicios de Ingenieria Genetica de Extremo a Extremo")
    pdf.draw_navigation(4, total_slides)
    
    # 2x2 grid layout coordinates (A4 total height 210, usable height 36 to 189)
    col_w = 130
    col_h = 74
    x1, x2 = 15, 152
    y1, y2 = 36, 115
    
    steps_data = [
        ("01", "Diseno y Optimizacion", 
         "Codon Optimization", 
         "Diseno y modelado in silico para asegurar alta expresion y estabilidad en el organismo huesped. Incrementa rendimientos de expresion.",
         ["Optimizacion de codones", "Diseno in silico de mapas", "Anotacion de tags", "Archivos GenBank (.gb)"],
         x1, y1, RGB_TEAL_BRIGHT),
        
        ("02", "Clonacion y Ensamble", 
         "Gibson / Golden Gate", 
         "Materializacion de los vectores mediante ligacion enzimatica tradicional, Golden Gate o Gibson Assembly. 100% libre de mutaciones.",
         ["Ensamble molecular", "Ligasas y restriccion", "Validacion de juntas", "Secuenciacion Sanger"],
         x2, y1, RGB_BLUE_ACCENT),
        
        ("03", "Escalamiento y Purificacion", 
         "Microgramos a Gramos", 
         "Propagacion del plasmido en biorreactores y purificacion cromatografica por columnas de intercambio anionico para maxima calidad.",
         ["ADN >90% superenrollado", "Endotoxinas <0.05 EU/ug", "Ensayos LAL cromogenicos", "Producto liofilizado"],
         x1, y2, RGB_BLUE_ACCENT),
        
        ("04", "Integracion y Consultoria", 
         "Bioprocesos Piloto", 
         "Asesoramiento tecnico en bioseguridad, escalado de lotes para fases preclinicas e integracion en procesos industriales.",
         ["Diseno de bioprocesos", "Protocolos personalizados", "Estabilidad del plasmido", "Soporte regulatorio"],
         x2, y2, RGB_TEAL_BRIGHT)
    ]
    
    for num, title, subtitle, desc, specs, cx, cy, color in steps_data:
        # Card outline (rounded)
        pdf.draw_card(cx, cy, col_w, col_h, accent_color=color)
        
        # Number Badge
        pdf.set_xy(cx + 6, cy + 5)
        pdf.set_font("Helvetica", "B", 18)
        pdf.set_text_color(*color)
        pdf.cell(15, 6, num)
        
        # Step Title
        pdf.set_xy(cx + 18, cy + 5)
        pdf.set_font("Helvetica", "B", 11)
        pdf.set_text_color(*RGB_TEXT_DARK)
        pdf.cell(100, 5, title)
        
        # Subtitle
        pdf.set_xy(cx + 18, cy + 10)
        pdf.set_font("Helvetica", "I", 8.5)
        pdf.set_text_color(*RGB_TEXT_MUTED)
        pdf.cell(100, 4, subtitle)
        
        # Divider line inside card
        pdf.set_draw_color(*RGB_BORDER)
        pdf.set_line_width(0.3)
        pdf.line(cx + 6, cy + 16, cx + col_w - 6, cy + 16)
        
        # Left column inside card: Description
        desc_y = cy + 20
        pdf.set_xy(cx + 6, desc_y)
        pdf.set_font("Helvetica", "", 9)
        pdf.set_text_color(*RGB_TEXT_MUTED)
        pdf.multi_cell(56, 4.2, desc, align="L")
        
        # Right column inside card: Specifications
        spec_x = cx + 68
        pdf.set_xy(spec_x, cy + 20)
        pdf.set_font("Helvetica", "B", 8.5)
        pdf.set_text_color(*RGB_TEXT_DARK)
        pdf.cell(50, 4, "Especificaciones:")
        
        spec_y = cy + 25.5
        for spec in specs:
            pdf.set_xy(spec_x, spec_y)
            pdf.draw_square_bullet(spec_x, spec_y, color)
            pdf.set_xy(spec_x + 3.5, spec_y)
            pdf.set_font("Helvetica", "", 8)
            pdf.set_text_color(*RGB_TEXT_MUTED)
            # Use multi_cell to prevent any text overflow
            pdf.multi_cell(50, 3.5, spec, align="L")
            spec_y += 7.5

    pdf.draw_slide_footer(4, total_slides)

    # ----------------------------------------------------
    # SLIDE 5: MATRIZ DE ESPECIFICACIONES DE CALIDAD
    # ----------------------------------------------------
    pdf.add_page()
    pdf.draw_bg_light()
    pdf.draw_slide_header("Control de Calidad", "Grados de Pureza y Especificaciones de Analisis")
    pdf.draw_navigation(5, total_slides)
    
    # Brief introduction text
    pdf.set_xy(15, 31)
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(*RGB_TEXT_DARK)
    pdf.cell(267, 5, "Para optimizar el presupuesto cientico, clasificamos la referencia de produccion en tres niveles analiticos:")
    pdf.ln(5)
    
    # Table Coordinates
    start_x = 15
    y_start = 39
    col_widths = [57, 70, 70, 70] # Total = 267mm
    row_height = 14
    
    # Table Header Row
    headers = [
        "Especificacion",
        "Grado Investigacion\n(Research Grade)",
        "Grado Transfeccion\n(High Quality / Transfection)",
        "Grado Pre-clinico\n(GMP-like)"
    ]
    
    pdf.set_xy(start_x, y_start)
    pdf.set_fill_color(*RGB_BG_DARK)
    pdf.set_text_color(*RGB_TEXT_LIGHT)
    pdf.set_font("Helvetica", "B", 9)
    pdf.set_draw_color(*RGB_BORDER)
    pdf.set_line_width(0.3)
    
    # Draw header cells
    for idx, width in enumerate(col_widths):
        # We use multi_cell for headers since some have 2 lines
        curr_x = pdf.get_x()
        curr_y = pdf.get_y()
        pdf.rect(curr_x, curr_y, width, row_height, "FD")
        pdf.set_xy(curr_x + 2, curr_y + 2)
        pdf.multi_cell(width - 4, 4.5, headers[idx], align="C")
        pdf.set_xy(curr_x + width, curr_y)
        
    pdf.ln(row_height)
    
    # Table content rows
    rows_data = [
        ["% ADN Superenrollado", 
         "> 85% verificado en gel de agarosa\n(Analisis densitometrico basico)", 
         "> 90% verificado por HPLC / capilar\n(Maxima eficiencia de transfeccion)", 
         "> 95% verificado por HPLC validado\n(Estable y homogeneo para ensayos in vivo)"],
        
        ["Limite de Endotoxinas", 
         "No controlado de forma activa\n(Valores tipicos < 0.1 EU/ug)", 
         "< 0.05 EU/ug verificado por ensayo LAL\n(Libre de pirogenos e inmunogenicidad)", 
         "< 0.01 EU/ug o indetectable por LAL\n(Apto para estudios preclinicos in vivo)"],
        
        ["Trazas Biologicas\n(ARN / ADN Genomico)", 
         "Trazas leves permitidas\n(Visibles en gel de agarosa)", 
         "Ausente verificado por fluorometria Qubit\n(ADN genomico < 1% residual)", 
         "Ausente verificado con qPCR especifico\n(Genomico < 0.5%, ARN indetectable)"],
         
        ["Trazas Analiticas", 
         "Cromatograma de lectura Sanger basico\npara verificar juntas de clonacion.", 
         "Certificado de analisis COA, secuenciacion\nSanger de inserto + NGS de control.", 
         "Trazabilidad completa de lote, Certificado\nCOA y reporte NGS de secuencia completa."],
         
        ["Aplicaciones\nRecomendadas", 
         "PCR, clonacion molecular, expresion en\nbacterias (E. coli), secuenciacion basica.", 
         "Transfeccion celular, edicion con CRISPR/Cas,\nproduccion viral (AAV, Lentivirus).", 
         "Estudios de terapia genetica preclinicos\nin vivo, pruebas de vacunas de ADN."]
    ]
    
    alternate = False
    for row_idx, row in enumerate(rows_data):
        curr_y = pdf.get_y()
        pdf.set_xy(start_x, curr_y)
        
        # Row background color
        if alternate:
            pdf.set_fill_color(241, 245, 249) # alternate row bg
        else:
            pdf.set_fill_color(255, 255, 255)
            
        alternate = not alternate
        
        # Draw cells in row
        for idx, text in enumerate(row):
            cx = pdf.get_x()
            cy = pdf.get_y()
            
            # Background rectangle for the cell
            pdf.rect(cx, cy, col_widths[idx], row_height, "FD")
            
            # Print text inside the cell
            pdf.set_xy(cx + 2.5, cy + 2)
            
            # Apply bold styling to the first column (labels)
            if idx == 0:
                pdf.set_font("Helvetica", "B", 8.5)
                pdf.set_text_color(*RGB_TEXT_DARK)
            else:
                pdf.set_font("Helvetica", "", 7.5)
                pdf.set_text_color(*RGB_TEXT_MUTED)
                
            pdf.multi_cell(col_widths[idx] - 4, 3.2, text, align="L")
            pdf.set_xy(cx + col_widths[idx], cy)
            
        pdf.ln(row_height)
        
    pdf.draw_slide_footer(5, total_slides)

    # ----------------------------------------------------
    # SLIDE 6: PLAN DE FINANCIACION
    # ----------------------------------------------------
    pdf.add_page()
    pdf.draw_bg_light()
    pdf.draw_slide_header("Plan de Financiacion", "Distribucion y Rentabilidad del Presupuesto (60,000 EUR)")
    pdf.draw_navigation(6, total_slides)

    # Left Column: Strategic summary card
    content_y_fin = pdf.draw_card(15, 36, 110, 142, title="ESTRATEGIA OPERATIVA Y MARGEN", accent_color=RGB_TEAL_BRIGHT)
    pdf.set_xy(23, content_y_fin)
    
    finance_strategy = [
        ("Eficiencia Local vs Importacion", "Al fabricar reactivos y ensambles localmente en Mexico, eliminamos el 25% de costos asociados a aranceles aduanales, corretaje y fletes internacionales express."),
        ("Escalabilidad del Modelo", "La inversion inicial del presupuesto se orienta a consolidar la infraestructura fisica (CAPEX) y asegurar inventario de reactivos (OPEX) para los primeros 12 meses de operacion."),
        ("Margen de Utilidades Integrado", "El 20% del presupuesto se destina a control de calidad avanzado, soporte y amortizacion, garantizando un flujo operativo rentable con utilidades netas desde el primer lote.")
    ]
    
    for title, desc in finance_strategy:
        pdf.set_x(23)
        pdf.draw_square_bullet(pdf.get_x(), pdf.get_y(), RGB_TEAL_BRIGHT)
        pdf.set_x(26)
        pdf.set_font("Helvetica", "B", 9.5)
        pdf.set_text_color(*RGB_TEXT_DARK)
        pdf.cell(100, 4.5, title)
        pdf.ln(4.5)
        pdf.set_x(26)
        pdf.set_font("Helvetica", "", 8.5)
        pdf.set_text_color(*RGB_TEXT_MUTED)
        pdf.multi_cell(95, 4, desc, align="L")
        pdf.ln(2.5)

    # Right Column: Budget distribution and bar chart graphics
    content_y_breakdown = pdf.draw_card(133, 36, 149, 142, title="DESGLOSE Y ASIGNACION DE RECURSOS", accent_color=RGB_BLUE_ACCENT)
    
    # 3 Sectors breakdown
    sectors = [
        ("1. Infraestructura de Laboratorio", 50, 30000, RGB_TEAL_BRIGHT, 
         ["Habilitacion de Cleanroom (Area limpia ISO Clase 8).", 
          "Adquisicion de biorreactores piloto y sistemas de purificacion."]),
        
        ("2. Logistica de Materias Primas", 30, 18000, RGB_BLUE_ACCENT, 
         ["Importacion consolidada de enzimas, columnas y buffers en volumen.", 
          "Establecimiento de una red de distribucion con cadena de frio (-20C)."]),
        
        ("3. Margen de Operacion y Utilidades", 20, 12000, RGB_EMERALD, 
         ["Secuenciacion NGS de control de calidad para validacion de lotes.", 
          "Utilidad neta operativa y fondo de contingencias logistas."])
    ]
    
    curr_y = content_y_breakdown + 1
    for idx, (title, pct, amt, color, desc_list) in enumerate(sectors):
        # Sector Title & Budget
        pdf.set_xy(141, curr_y)
        pdf.set_font("Helvetica", "B", 10)
        pdf.set_text_color(*RGB_TEXT_DARK)
        pdf.cell(80, 5, title)
        
        pdf.set_xy(225, curr_y)
        pdf.set_font("Helvetica", "B", 10)
        pdf.set_text_color(*color)
        pdf.cell(50, 5, f"{pct}% | {amt:,} EUR", align="R")
        
        # Descriptions
        curr_y += 5.5
        for desc in desc_list:
            pdf.set_xy(141, curr_y)
            pdf.draw_square_bullet(pdf.get_x(), pdf.get_y(), color)
            pdf.set_xy(144, curr_y)
            pdf.set_font("Helvetica", "", 8.5)
            pdf.set_text_color(*RGB_TEXT_MUTED)
            pdf.multi_cell(115, 4, desc, align="L")
            curr_y = pdf.get_y() + 0.5
            
        # Draw Progress/Bar Graph
        curr_y += 1.5
        # Background Bar (rounded)
        pdf.set_fill_color(226, 232, 240)
        pdf.rect(141, curr_y, 115, 3.5, "F", round_corners=True, corner_radius=1)
        # Overlay Fill Bar (rounded)
        pdf.set_fill_color(*color)
        pdf.rect(141, curr_y, int(pct * 1.15), 3.5, "F", round_corners=True, corner_radius=1)
        
        # Percentage indicator
        pdf.set_xy(260, curr_y - 0.5)
        pdf.set_font("Helvetica", "B", 9)
        pdf.set_text_color(*RGB_TEXT_DARK)
        pdf.cell(15, 4, f"{pct}%", align="L")
        
        curr_y += 10.5 # Gap to next sector

    pdf.draw_slide_footer(6, total_slides)

    # ----------------------------------------------------
    # SLIDE 7: RESPALDO, CIERRE Y CONTACTO
    # ----------------------------------------------------
    pdf.add_page()
    pdf.draw_bg_dark()
    pdf.draw_slide_header("Respaldo y Contacto", "Consolidando la Biologia Molecular en Mexico", dark_mode=True)
    pdf.draw_navigation(7, total_slides, dark_mode=True)
    
    # 2 Columns layout
    col_w = 128
    col_h = 142
    y_pos = 36
    
    # Column 1: Scientific Backing
    x_1 = 15
    pdf.draw_card(x_1, y_pos, col_w, col_h, title="RESPALDO Y VALIDACION CIENTIFICA", bg_color=RGB_CARD_DARK, border_color=RGB_CARD_DARK, accent_color=RGB_TEAL_BRIGHT)
    pdf.set_xy(x_1 + 6, y_pos + 16)
    pdf.set_font("Helvetica", "", 10.5)
    pdf.set_text_color(*RGB_TEXT_SLATE)
    pdf.multi_cell(col_w - 12, 5, "Nuestra produccion y control de calidad no operan aislados. Colaboramos estrechamente con la comunidad de investigacion mexicana:", align="L")
    pdf.ln(3)
    
    collaborations = [
        ("Colaboracion Universitaria UNAM", "Suministro directo de vectores moleculares a laboratorios de investigacion biologica y medica de la UNAM, acelerando tesis y papers."),
        ("Validacion L.N. FES Iztacala", "Nuestros lotes de plasmidos son respaldados y validados por el Laboratorio Nacional de la FES Iztacala, asegurando consistencia inter-lote."),
        ("Asesoria de PhDs", "El equipo tecnico de Plasmex esta integrado por doctores y genetistas especializados listos para evaluar tus proyectos moleculares en menos de 24 horas.")
    ]
    for label, desc in collaborations:
        pdf.set_x(x_1 + 6)
        pdf.draw_square_bullet(pdf.get_x(), pdf.get_y(), RGB_TEAL_BRIGHT)
        pdf.set_x(x_1 + 9)
        pdf.set_font("Helvetica", "B", 10)
        pdf.set_text_color(*RGB_TEAL_BRIGHT)
        pdf.cell(110, 4.5, label)
        pdf.ln(4.5)
        pdf.set_x(x_1 + 9)
        pdf.set_font("Helvetica", "", 9)
        pdf.set_text_color(*RGB_TEXT_SLATE)
        pdf.multi_cell(col_w - 15, 4, desc, align="L")
        pdf.ln(2.5)
        
    # Column 2: Call to Action / Contact
    x_2 = 154
    pdf.draw_card(x_2, y_pos, col_w, col_h, title="¿LISTO PARA INICIAR TU PROYECTO?", bg_color=RGB_CARD_DARK, border_color=RGB_CARD_DARK, accent_color=RGB_BLUE_ACCENT)
    pdf.set_xy(x_2 + 6, y_pos + 16)
    pdf.set_font("Helvetica", "", 10.5)
    pdf.set_text_color(*RGB_TEXT_SLATE)
    pdf.multi_cell(col_w - 12, 5, "Elimina la burocracia de aduanas. Desarrolla y escala localmente con plasmidos superenrollados libres de endotoxinas:", align="L")
    pdf.ln(3)
    
    contact_info = [
        ("Sitio Web Oficial:", "https://plasmex.netlify.app/"),
        ("Cotizaciones Rapidas:", "plasmex.oficcial@gmail.com"),
        ("Constructor in silico:", "Disena tu plasmido y genera el pedido directo."),
        ("Tiempos de Entrega:", "Clonado y purificacion estandar en 10-15 dias habiles.")
    ]
    for label, desc in contact_info:
        pdf.set_x(x_2 + 6)
        pdf.set_font("Helvetica", "B", 9.5)
        pdf.set_text_color(*RGB_TEXT_LIGHT)
        pdf.cell(40, 5, label)
        pdf.set_font("Helvetica", "", 9.5)
        pdf.set_text_color(*RGB_TEAL_BRIGHT if "https" in desc or "@" in desc else RGB_TEXT_SLATE)
        pdf.set_x(x_2 + 46)
        pdf.multi_cell(74, 5, desc, align="L")
        
    pdf.set_xy(x_2 + 6, y_pos + 105)
    pdf.set_fill_color(*RGB_BG_DARK)
    pdf.rect(x_2 + 6, y_pos + 105, col_w - 12, 28, "F", round_corners=True, corner_radius=2)
    pdf.set_xy(x_2 + 10, y_pos + 109)
    pdf.set_font("Helvetica", "B", 10.5)
    pdf.set_text_color(*RGB_TEXT_LIGHT)
    pdf.cell(100, 5, "Suministro Nacional Acelerado")
    pdf.ln(5)
    pdf.set_xy(x_2 + 10, y_pos + 115)
    pdf.set_font("Helvetica", "I", 8.5)
    pdf.set_text_color(*RGB_TEXT_SLATE)
    pdf.multi_cell(col_w - 20, 4, "Facturacion CFDI directa en Mexico. Sin impuestos de importacion ni retenciones por el SAT.", align="L")
    
    pdf.draw_slide_footer(7, total_slides, dark_mode=True)
    
    # Save the output file
    os.makedirs("presentacion", exist_ok=True)
    out_path = os.path.join("presentacion", "plasmex_presentacion.pdf")
    pdf.output(out_path)
    print(f"Presentation successfully compiled at: {os.path.abspath(out_path)}")

if __name__ == "__main__":
    build_presentation()
