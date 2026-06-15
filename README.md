# Serigrafía Duato · Web v3 cinemática

Propuesta de rediseño web para [Serigrafía Duato](https://serigrafiaduato.es/) (Alboraya, Valencia · 30+ años · 12 técnicas de marcaje profesional).

Producido por **[Boomatik](https://boomatik.com)** · junio 2026.

---

## Dos variantes para comparar

Cada una es un mockup HTML standalone que se abre con doble click en `index.html`. Ambos comparten los assets visuales (vídeos + fotos generados con Luma Dream Machine).

### Variante A · `mockup-v3/` — Editorial cream cinemática

Paleta cream `#EFEAE0` + ink `#0A0A0A` + spot Duato `#F37920`. Tipografía Fraunces variable + Inter Tight + JetBrains Mono. Foco en oficio editorial premium (Bottega Veneta / Patek Philippe / Filson).

Efectos destacados:
- Hero scroll-driven con press window CMYK + registration marks
- Pantone Book 3D interactivo (12 técnicas)
- Test print strip industrial
- Cursor rasqueta + imprime swatch al click
- Halftone reactivo a velocidad de scroll
- Fraunces variable reactiva al cursor X

→ **Abre** [`mockup-v3/index.html`](./mockup-v3/index.html)

### Variante B · `mockup-v3-alt/` — Risograph editorial brutalista

Paleta paper `#FFF1D6` + ink `#0E0E12` + spot Duato `#F25F0C` + cobalto riso `#1E3FFF`. Tipografía Instrument Serif italic + Bricolage Grotesque variable + Departure Mono. Foco en estética risograph print zine premium (RISOTTO / Studio Feixen / Klim Type).

Efectos destacados:
- Brocha vertical orgánica que pinta con scroll
- Lenis smooth scroll
- 4 banners cinemáticos entre actos (paper-fold · CMYK halftone · ink-flow · clothesline)
- Cursor risograph dual (naranja+cobalto duotone)
- CMYK color separation en H2 al entrar al viewport
- H1 letter-by-letter imprint con micro-misregistration
- Sticker peel hover en casos (transfer DTF físico)
- Drag smudge cursor (click sostenido = pintas con tinta)
- Folio counter sticky con scroll-spy
- Stamp rotating "MARCAJE · ALBORAYA · 1992"
- Text scramble reveal con glyphs `▓▒░◢◣`
- Print proof crops en esquinas de casos

→ **Abre** [`mockup-v3-alt/index.html`](./mockup-v3-alt/index.html)

---

## Stack técnico

- **HTML/CSS/JS vanilla** — sin build pipeline, sin npm install
- **Lenis** v1.1.20 smooth scroll (CDN)
- **GSAP** 3.12 + ScrollTrigger (CDN, Variante A)
- **Three.js** no usado en estas variantes
- **Fuentes** Google Fonts (Fraunces / Inter Tight / JetBrains Mono / Instrument Serif / Bricolage Grotesque / Departure Mono)
- **Vídeos** generados con [Luma Dream Machine 1.5](https://lumalabs.ai/dream-machine)
- **Fotos casos** generadas con Imagen 4.0 / Gemini

## Cómo abrir en local

Doble click en cualquiera de los dos `index.html`. Funciona offline. Si quieres servir con un mini server local para ver los vídeos correctamente:

```bash
cd mockup-v3        # o mockup-v3-alt
npx http-server -p 7800 -s --cors
```

Abre `http://localhost:7800/`.

## Datos reales del cliente

- **Serigrafía Duato S.L.**
- Camino del Mar 36, Polígono Industrial III, 46120 Alboraya · Valencia
- +34 96 186 02 75 · info@serigrafiaduato.es
- 12 técnicas: serigrafía textil, tampografía, láser CO₂, láser fibra, DTF, sublimación, rotulación, UV, látex, fresado metacrilato, gota resina, cilíndrica
- Fundado 1992 · mismo polígono industrial

## Decisión sobre cuál llevar a producción

Pasos siguientes propuestos:

1. Marc + Vicente Duato eligen variante A o B (o híbrido)
2. Validación copy real con datos auditados (tiempo medio presupuesto, casos clientes autorizados)
3. Sprint 6 semanas: scaffold Next.js 16 + Sanity v3 + Vercel Pro
4. Lookbook visual Luma extendido (3 materiales + 4 banners adicionales)
5. Launch + monitoring 14 días

Coste de referencia: **setup 6.255€ + mantenimiento 240€/mes** (estimación no vinculante).

---

*Mockup producido por Boomatik · Valencia · junio 2026*
